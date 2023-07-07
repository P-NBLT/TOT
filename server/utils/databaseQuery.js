import pool from "../config/database.js";

export async function executeQuery(query, values = [], cb) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(query, values);

    await client.query("COMMIT");

    return result.rows;
  } catch (err) {
    await client.query("ROLLBACK");
    return cb(err);
  } finally {
    client.release(true);
  }
}
