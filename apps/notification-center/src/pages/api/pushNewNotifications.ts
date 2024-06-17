import type { NextApiRequest, NextApiResponse } from "next";
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

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === "POST") {
    const { notifications } = req.body;

    try {
      await pushNewNotificationToDB(notifications);

      res.status(200).json({
        message: "pushed notifications successfully",
      });
    } catch (error) {
      res.status(501).json({
        message: "some error occured",
      });
    }
  }
}
