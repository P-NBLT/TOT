import { Server } from "socket.io";

export function createServer(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", async (socket) => {
    console.log("SOCKET Working", socket.id);

    io.on("disconenct", () => {
      console.log("socket disconnected");
    });
  });
}
