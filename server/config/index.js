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
  SERVER_PORT: process.env.SERVER_PORT,
  //POSTGRES
  DB_PORT: process.env.DB_PORT,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  //ENCRYPTION
  SALT: process.env.SALT,
  //DOMAIN
  WEBSITE_DOMAIN: process.env.CLIENT_DOMAIN,
  CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
  SERVER_DOMAIN: process.env.SERVER_DOMAIN,
  //GOOGLE
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URI:
    process.env.SERVER_DOMAIN + process.env.GOOGLE_PATH_CALLBACK_URI,
  //GITHUB
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URI:
    process.env.SERVER_DOMAIN + process.env.GITHUB_PATH_CALLBACK_URI,
  //SENGRID
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  //AWS
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET: process.env.AWS_BUCKET_NAME,
};
