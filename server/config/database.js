import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

export const pool = new pg.Pool({
  host,
  port,
  username,
  password,
  database,
});
