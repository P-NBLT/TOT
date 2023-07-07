import dotenv from "dotenv";
import path from "path";
import { getEnvironment } from "../utils/getEnvironment.js";

const env = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : await getEnvironment();

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${env}`),
});

export const config = {
  HOST: process.env.HOST,
  DB_PORT: process.env.DB_PORT,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  SERVER_PORT: process.env.SERVER_PORT,
};
