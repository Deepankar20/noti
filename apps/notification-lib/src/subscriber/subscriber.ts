import db from "@repo/db/client"

export class Subscriber {
  private appId: string;

  constructor({ appId }: { appId: string }) {
    this.appId = appId;
  }

  async addSubscriber(subscriberData: { name: string }) {

    const developerData = await db.developer.findFirst({
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
    const subscriberId = "";

    await db.subscriber.create({
      //@ts-ignore
      data: {
        subscriberId: subscriberId,
        developerId: devId,
      },
    });
  }

  getSubscribers(subscriberId: string) {
    // Code to fetch subscribers from the database
  }

  async delete() {}
}
