export const dbSuccess = (data, error = null) => {
  if (data === null) return { data, error };
  if (typeof data === "object" && data.length >= 0) return data;
  return { ...data, error };
};

export const dbHandleError = (error) => {
  console.log(err.developerMessage);
  return dbSuccess(null, error);
};

export const dbPropagateError = (error) => {
  console.log(`\n\nERROR::ORIGIN<<DATABASE>>::`, error.developerMessage);
  throw { status: error.status, clientMessage: error.clientMessage };
};
