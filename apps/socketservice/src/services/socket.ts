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
    let users = {};
    const io = this.io;
    io.on("connect", (socket: any) => {
      console.log(`New Socket Connected : id: ${socket.id}`);
      const token = socket.handshake.query.userToken;
      //@ts-ignore
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
