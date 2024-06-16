"use server"
import db from "@repo/db/client";

type NotificationProps = {
  content: string;
  subscriberId: string;
};

export async function pushNewNotificationToDB(props: NotificationProps[]) {
  try {
    props.map((notification) => {
      const newNotification = db.notification.create({
        data: {
          content: notification.content,
          subscriberId: notification.subscriberId,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
}
