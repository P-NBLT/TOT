import pool from "../config/database.js";

export async function executeQuery(query, values = [], errorCb) {
  const client = await pool.connect().catch((err) => errorCb(err));

  try {
    await client.query("BEGIN");

    const result = await client.query(query, values);

    await client.query("COMMIT");

    return result.rows;
  } catch (err) {
    await client.query("ROLLBACK");
    return errorCb(err);
  } finally {
    client.release(true);
  }
}
