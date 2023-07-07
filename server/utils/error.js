export function errorQueryDataBase(err) {
  throw new Error(`'ERROR WITH QUERYING THE DB:' ${err}`);
}
