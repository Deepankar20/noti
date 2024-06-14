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

  public initListeners() {
    console.log("init socket listeners...");

    const io = this.io;

    io.on("connect", (socket) => {
      console.log(`New Socket Connected : id: ${socket.id}`);
      //   const token = socket.handshake.query.userToken;
      //@ts-ignore

      socket.on(
        "event:inapp",
        (props: { subscriberId: string; appId: string }) => {
          const { appId, subscriberId } = props;
          console.log(props);
        }
      );
    });
  }

  get io(): Server {
    return this._io;
  }
}

export default SocketService;
