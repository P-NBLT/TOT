import express from "express";
import cors from "cors";
import { createServer } from "http";

export function createHttpServer() {
  const app = express();
  const httpServer = createServer(app);

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return httpServer;
}
