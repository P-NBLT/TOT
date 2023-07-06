import { pool } from "../config/database.js";

export async function executeQuery(query, values = []) {
  const client = await pool.connect();

  try {
    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    console.log(err);
  } finally {
    client.release(true);
  }
}
