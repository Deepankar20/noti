import { prisma } from "../db";
import { generateUniqueId } from "../utils/createUniqueId";

export class Subscriber {
  private appId: string;
  public subscriberId: string;

  constructor({ appId }: { appId: string }) {
    this.appId = appId;
    this.subscriberId = "";
  }

  async addSubscriber(subscriberData: { username: string }) {
    //@ts-ignore
    const developerData = await prisma.developer.findFirst({
      where: {
        appId: this.appId,
      },
    });

    if (!developerData) {
      return {
        code: 401,
        message: "Developer Not Found",
      };
    }

    const devId = developerData?.id;

    this.subscriberId = await generateUniqueId(
      this.appId,
      subscriberData.username
    );

    await prisma.subscriber.create({
      //@ts-ignore
      data: {
        subscriberId: this.subscriberId,
        developerId: devId,
        name: subscriberData.username,
        appid: this.appId,
      },
    });

    return {
      subscriberId: this.subscriberId,
    };
  }

  getSubscriberId(subscriberId: string) {
    return this.subscriberId;
  }

  async delete() {}
}
