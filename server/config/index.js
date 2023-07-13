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
  SALT: process.env.SALT,
  WEBSITE_DOMAIN: process.env.DOMAIN,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URI:
    process.env.DOMAIN + process.env.GOOGLE_PATH_CALLBACK_URI,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URI:
    process.env.DOMAIN + process.env.GITHUB_PATH_CALLBACK_URI,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
};
