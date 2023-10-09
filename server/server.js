import express from "express";
import cors from "cors";
import { createServer } from "http";
import appRouter from "./routes/index.js";
import {
  initializePassport,
  serializePassport,
  sessionMiddleware,
  passportMiddleware,
} from "./passport/passport.js";
import { createServer as createIoServer } from "./io.js";

export function createHttpServer() {
  const app = express();
  const httpServer = createServer(app);
  createIoServer(httpServer, sessionMiddleware, passportMiddleware);
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
      exposedHeaders: ["ETag"],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  initializePassport(app);
  serializePassport();
  app.use("/", appRouter);

  return httpServer;
}
