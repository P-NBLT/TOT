import pg from "pg";
import { config } from "./index.js";

export const pool = new pg.Pool({
  host: config.HOST,
  port: config.DB_PORT,
  username: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
});
