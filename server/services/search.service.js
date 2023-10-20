import { executeQuery } from "../utils/databaseQuery.js";

export async function search(SQLQuery, values) {
  try {
    const response = await executeQuery(SQLQuery, values);
    return response;
  } catch (e) {
    throw new Error(
      `Failed to query a search operation with values ${values}. Error: ${e}`
    );
  }
}
