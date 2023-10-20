import { Server } from "socket.io";
import { EVENTS_LISTENER } from "./services/socket/events.js";
import { initUser, socketAuthenticate } from "./services/socket/index.js";

export function createServer(
  httpServer,
  sessionMiddleware,
  passportMiddleware
) {
  const io = new Server(httpServer, {
    cors: { origin: "http://localhost:3000", credentials: true },
  });

  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
  });

  io.use((socket, next) => {
    passportMiddleware.initialize(
      socket.request,
      socket.request.res || {},
      next
    );
  });

  io.use((socket, next) => {
    passportMiddleware.session(socket.request, socket.request.res || {}, next);
  });

  io.on(EVENTS_LISTENER.connect, async (socket) => {
    console.log("SOCKET Working", socket.id);
    const user = await socketAuthenticate(socket);
    user && initUser(socket, user);
  });
}
