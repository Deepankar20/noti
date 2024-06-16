"use server"
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
