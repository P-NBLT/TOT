import pg from "pg";
import { config } from "./index.js";

const pool = new pg.Pool({
  host: config.HOST,
  port: config.DB_PORT,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
});

export default pool;
