import { io, Socket } from "socket.io-client";
import {prisma} from "../db"

export class NotificationInApp {
  private socket: Socket;
  private appId: string;
  constructor({ appId }: { appId: string }) {
    this.appId = appId;
    this.socket = io("http://localhost:8000");
  }

  async validateAppId() {
    const applicationId = this.appId;

    if (!applicationId) {
      return {
        code: 404,
        message: "AppId Not Found",
      };
    }
    const developer = prisma.developer.findFirst({
      where: {
        appId: applicationId,
      },
    });

    if (!developer) {
      return {
        code: 403,
        message: "Application ID Invalid",
      };
    }

    return {
      code: 201,
      message: "Application Id is valid",
      appId: applicationId,
    };
  }

  async trigger(subscriberId: string, content: string) {
    const applicationId = (await this.validateAppId()).appId;

    if (applicationId !== this.appId) {
      return {
        code: 403,
        message: "unauthorised access",
      };
    }

    try {
      const subscriber = await prisma.subscriber.findFirst({
        where: {
          subscriberId,
          appid: this.appId,
        },
      });

      if (!subscriber) {
        return {
          code: 404,
          message: "Invalid Subscriber Id or App Id",
        };
      }

      this.socket.emit("event:inapp", {
        subscriberId,
        appId: this.appId,
        content,
      });
    } catch (error) {
      console.log(error);

      return {
        code: 501,
        message: "some error occured",
      };
    }
  }
}
