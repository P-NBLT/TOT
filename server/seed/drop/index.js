import { executeQuery } from "../../utils/databaseQuery.js";
// this script is to quickly remove tables in case
// while developing the app I messed with the db
// or I am restructuring the db
// and I need to start from scratch.
// this is for development purpose only.

(async function dropAllTables() {
  const query = `DROP TABLE "comments";
  DROP TABLE posts;
  DROP TABLE friendship;
  DROP TABLE public_messages;
  DROP TABLE "users";
  DROP TABLE affinity;
  DROP TABLE planets;`;

  await executeQuery(query);
})();