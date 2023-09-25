import { Server } from "socket.io";

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
}
