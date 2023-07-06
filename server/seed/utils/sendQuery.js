import { pool } from "../../config/database.js";

export async function sendQuery(query) {
  const client = await pool.connect();

  try {
    await client.query(query);
    console.log(`tables succesfully created.`);
  } catch (err) {
    console.error(`Error creating tables`, err);
  } finally {
    client.release();
  }
}
