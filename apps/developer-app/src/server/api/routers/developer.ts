import db from "@repo/db/client";
import bcrypt, { genSalt } from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateUniqueId = async (prop1: string, prop2: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(prop1 + prop2);
  return hash.digest("hex");
};

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const developerRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { username, email, password } = input;

      try {
        const isDeveloperExist = await db.developer.findFirst({
          where: {
            email,
          },
        });

        if (isDeveloperExist) {
          return {
            code: 403,
            data: null,
            message: "Developer Already Registered",
          };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const appId = await generateUniqueId(email, password);

        const newDeveloper = await db.developer.create({
          data: {
            username,
            email,
            password: hashedPassword,
            appId,
          },
        });

        const token = jwt.sign(
          { username, email, appId },
          process.env.JWT_SECRET as string,
        );

        return {
          data: token,
          code: 201,
          message: "developer created successfully!",
        };
      } catch (error) {
        return {
          code: 501,
          message: "Internal Server Error",
          data: null,
        };
      }
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      try {
        const developerExist = await db.developer.findFirst({
          where: {
            email,
          },
        });

        if (!developerExist) {
          return {
            code: 404,
            message: "Developer Not Found",
            data: null,
          };
        }

        const validUser = await bcrypt.compare(
          password,
          developerExist.password,
        );

        if (!validUser) {
          return {
            code: 403,
            message: "Unauthorised",
            data: null,
          };
        }

        const token = jwt.sign(
          {
            username: developerExist.username,
            email: developerExist.email,
            appId: developerExist.appId,
          },
          process.env.JWT_SECRET as string,
        );

        return {
          data: token,
          message: "successfully logged in",
          code: 201,
        };
      } catch (error) {
        return {
          code: 501,
          message: "Internal Server Error",
          data: null,
        };
      }
    }),
});
