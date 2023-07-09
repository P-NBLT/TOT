export function throwErrorWithColor(message) {
  const colorRed = "\x1b[31m";
  const colorReset = "\x1b[0m";

  const errorMessage = `${colorRed}${message}${colorReset}`;
  throw new Error(errorMessage);
}
