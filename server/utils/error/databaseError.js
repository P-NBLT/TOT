import { throwErrorWithColor } from "./colorError.js";

export function errorQueryDataBase(err) {
  if (err.code === "23505") {
    throwErrorWithColor(`ERROR WHILE QUERYING THE DB: ${err}`);
  } else if (err.code === "ECONNREFUSED") {
    throwErrorWithColor(
      `ERROR impossible to connect to the database. Check your connection. Error details: ${err}`
    );
  } else {
    throwErrorWithColor(`ERROR realated to Postgres DB: ${err}`);
  }
}
