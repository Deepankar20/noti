import { Subscriber } from "./subscriber/subscriber";
import { NotificationInApp } from "./notification/notification";

export class Noti{
  public subscriber: Subscriber;
  public notificationInApp: NotificationInApp;

  constructor(appId: string) {
    this.subscriber = new Subscriber({ appId });
    this.notificationInApp = new NotificationInApp({ appId });
  }
}
