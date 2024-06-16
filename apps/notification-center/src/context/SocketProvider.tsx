"use client";
import db from "@repo/db/client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const subscriberId = "";
const appId = "";

interface ISocketContext {
  notifications: NotificationProps[];
  socket: any;
}

interface SocketProviderProps {
  children?: React.ReactNode;
}

type NotificationProps = {
  content: string;
  subscriberId: string;
};

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("state is undefined");

  return state;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const onInAppRecieve = useCallback((notification: NotificationProps) => {
    setNotifications((prev) => [...prev, notification]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000", {
      query: { subscriberId, appId },
    });

    setSocket((prev) => _socket);

    _socket.on("event:inapp:recieve", onInAppRecieve);

    return () => {
      _socket.disconnect();

      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
