import db from "@repo/db/client";
import { Subscriber } from "./subscriber/subscriber";
import { NotificationInApp } from "./notification/notification";

export class NotificationNode {
  private subscriber: Subscriber;
  private notificationInApp: NotificationInApp;

  constructor(appId: string) {
    this.subscriber = new Subscriber({ appId });
    this.notificationInApp = new NotificationInApp({ appId });
  }
}

