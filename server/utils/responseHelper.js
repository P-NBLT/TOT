import { CustomError } from "./error/customError.js";

export const success = (data, message = "Success") => {
  if (!data) return { success: true, message };
  return { success: true, data, status: message };
};

export const discontent = (data, message = "Unsatisfactory") => {
  return { success: true, data, status: message };
};

export const error = (error, message = "Failed") => {
  console.log(`\n\n ERROR::ORIGIN<<CONTROLLER>>:: ${error}\n\n`);
  if (error.clientMessage) {
    return { success: false, error: { message: error.clientMessage }, message };
  }
  if (typeof error === "string")
    return { success: false, error: { message: error }, status: message };
  return {
    success: false,
    error: { message: error.message || "Internal Error", ...error },
    status: message,
  };
};
