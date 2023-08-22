import { Server } from "socket.io";

export function createServer(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", async (socket) => {});
}
