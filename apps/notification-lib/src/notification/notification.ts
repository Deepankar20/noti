import { io, Socket } from "socket.io-client";
import db from "@repo/db/client";

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
    const developer = db.developer.findFirst({
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

  async trigger(appId: string, subscriberId: string, content: string) {
    const applicationId = (await this.validateAppId()).appId;

    if (applicationId !== appId) {
      return {
        code: 403,
        message: "unauthorised access",
      };
    }

    try {
      const subscriber = await db.subscriber.findFirst({
        where: {
          subscriberId,
          appid: appId,
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
        appId,
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
