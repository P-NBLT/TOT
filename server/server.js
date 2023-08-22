import express from "express";
import cors from "cors";
import { createServer } from "http";
import appRouter from "./routes/index.js";
import { initializePassport, serializePassport } from "./passport/passport.js";
import { createServer as createIOServer } from "./io.js";

export function createHttpServer() {
  const app = express();
  const httpServer = createServer(app);
  createIOServer(httpServer);
  app.use(cors({ credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  initializePassport(app);
  serializePassport();
  app.use("/", appRouter);

  return httpServer;
}
