import pool from "../config/database.js";
import { errorQueryDataBase } from "./error/databaseError.js";

export async function executeQuery(query, values = []) {
  const client = await pool.connect().catch((err) => errorQueryDataBase(err));

  try {
    await client.query("BEGIN");

    const result = await client.query(query, values);

    await client.query("COMMIT");

    return result.rows;
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    return errorQueryDataBase(err);
  } finally {
    client.release(true);
  }
}

export function selectOptionsHandler(selectOptions) {
  if (selectOptions === undefined || selectOptions === null) return "*";
  else {
    return selectOptions.join(", ");
  }
}

export function concatValues(value, values, record, records) {
  if (record === records[records.length - 1]) {
    return values.concat(`${value};`);
  } else {
    return values.concat(`${value},`);
  }
}
