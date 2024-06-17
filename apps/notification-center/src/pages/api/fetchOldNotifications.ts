import type { NextApiRequest, NextApiResponse } from "next";
import db from "@repo/db/client";

export async function fetchAllNotifications() {
  const subscriberId = "";

  try {
    const notifications = await db.notification.findMany({
      where: {
        subscriberId,
      },
    });

    return notifications;
  } catch (error) {
    console.log(error);
  }
}

type ResponseData = {
  message: string;
  data: any[] | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === "GET") {
    const oldNotifications = await fetchAllNotifications();

    if (!oldNotifications) {
      res.status(404).json({ message: "Notifications not found", data: [] });
    }

    res.status(200).json({
      message: "fetched notifications successfully",
      data: oldNotifications,
    });
  }
}
