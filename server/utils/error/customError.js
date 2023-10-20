import { throwErrorWithColor } from "./colorError.js";

export class CustomError extends Error {
  constructor({ message, status, err }) {
    super(message);
    this.status = status;
    this.code = err?.code || null;
    this.developerMessage = this.errorQueryDataBase(this.code);
    this.clientMessage = "Internal Error";
    this.raw = err;
  }

  errorQueryDataBase(code) {
    try {
      if (code === "23505") {
        this.status = 409;
        throwErrorWithColor(`ERROR WHILE QUERYING THE DB: ${this.message}`);
      } else if (code === "ECONNREFUSED") {
        this.status = 500;
        throwErrorWithColor(
          `ERROR impossible to connect to the database. Check your connection. Error details: ${err}`
        );
      } else {
        this.status = 500;
        throwErrorWithColor(`ERROR realated to Postgres DB: ${this.message}`);
      }
    } catch (e) {
      return e;
    }
  }
}
