import { useSocket } from "@/context/SocketProvider";
import { Noti } from "../../../notification-lib/src/index";
import db from "@repo/db/client";
import NotificationComponent from "@/components/NotificationComponent";

type NotificationProps = {
  content: string;
  subscriberId: string;
};

export default function Home() {
  const { notifications } = useSocket();
  const oldNotifications: any[] = [];

  //@ts-ignore
  const notificationsToShow = [
    ...oldNotifications,
    notifications,
  ] as NotificationProps[];

  return (
    <div>
      <div>
        <NotificationComponent notifications={notificationsToShow} />
      </div>
    </div>
  );
}
