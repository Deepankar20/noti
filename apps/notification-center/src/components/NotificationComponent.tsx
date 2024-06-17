import { useSocket } from "@/context/SocketProvider";
import db from "@repo/db/client";

type NotificationProps = {
  content: string;
  subscriberId: string;
};


export default function NotificationComponent(props: {
  notifications: NotificationProps[];
}) {
  const { notifications } = props;

  return (
    <>
      <div>
        {notifications?.map((notification) => {
          return <div>{notification.content}</div>;
        })}
      </div>
    </>
  );
}
