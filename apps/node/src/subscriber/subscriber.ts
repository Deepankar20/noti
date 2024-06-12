import db from "@repo/db/client";
import { node } from "../index";

export class subscriber {
  appid;
  developerId;

  constructor(appid: string, developerId: string) {
    this.appid = appid;
    this.developerId = "devId";
  }

  async addSubscriber(subscriberData: { name: string }) {
    // Code to add subscriber to the database
    // with this.appid
    const developerData = await db.developer.findFirst({
      where: {
        appId: this.appid,
      },
    });

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
