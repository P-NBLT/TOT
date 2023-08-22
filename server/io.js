import { Server } from "socket.io";
import { initUser, initBot } from "./services/socket/listeners.service.js";

export function createServer(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", async (socket) => {
    console.log("SOCKET Working", socket.id);
    initUser(socket);
    initBot(socket);
  });
}
