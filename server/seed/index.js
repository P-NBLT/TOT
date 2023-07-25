import dropAllTables from "./drop/index.js";
import createTables from "./create/index.js";
import populateTables from "./populate/index.js";
import { executeQuery } from "../utils/databaseQuery.js";

async function init() {
  const query = `SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE  table_schema = 'public'
  AND    table_name   = $1
);
`;
  const value = ["users"];
  // we want to know if the db already contain the users.
  const exist = await executeQuery(query, value);

  // if it does then we want to be able to reset all the db
  if (exist[0].exists) {
    await dropAllTables();
    await createTables();
    await populateTables();
  }
  // if not then we want to initialize the db with couple of extra operations
  // to correctly set the db such as set some types.
  else {
    await createTables(true);
    await populateTables();
  }
}
await init();
export default init; // beware if importing init it will automatically run the function in the file.
