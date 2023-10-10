import { executeQuery } from "../utils/databaseQuery.js";

export async function search(SQLQuery, values) {
  try {
    const response = await executeQuery(SQLQuery, values);
    if (response.length > 0) return response;
    else return { success: true, message: "no match found" };
  } catch (e) {
    throw new Error(
      `Failed to query a search operation with values ${values}. Error: ${e}`
    );
  }
}
