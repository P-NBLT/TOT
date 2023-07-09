import express from "express";
import cors from "cors";
import { createServer } from "http";
import appRouter from "./routes/index.js";

export function createHttpServer() {
  const app = express();
  const httpServer = createServer(app);

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", appRouter);

  return httpServer;
}
