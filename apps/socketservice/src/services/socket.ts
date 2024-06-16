import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init socket service...");

    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  private subsIdToSocketId: {
    [key: string]: string;
  } = {};

  public initListeners() {
    console.log("init socket listeners...");

    const io = this.io;

    io.on("connect", (socket) => {
      console.log(`New Socket Connected : id: ${socket.id}`);
      const subscriberId = socket.handshake.query?.subscriberId;
      const appId = socket.handshake.query?.appId;

      if (subscriberId && appId) {
        const key = JSON.stringify({ subscriberId, appId });
        this.subsIdToSocketId[key] = socket.id;
      }

      //@ts-ignore

      socket.on(
        "event:inapp",
        (props: { subscriberId: string; appId: string; content: string }) => {
          const { appId, subscriberId, content } = props;
          const key = JSON.stringify({ subscriberId, appId });
          const socketId = this.subsIdToSocketId[key];

          if (!socketId) {
            return {
              message: "error occured",
            };
          }

          io.to(socketId).emit("event:inapp:recieve", {
            subscriberId,
            content,
          });
        }
      );
    });
  }

  get io(): Server {
    return this._io;
  }
}

export default SocketService;
