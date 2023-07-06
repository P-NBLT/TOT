import { executeQuery } from "../../utils/databaseQuery.js";
import { dataManager } from "../starwarsData/index.js";
import {
  userValuesBuilder,
  planetsValuesBuilder,
  affinityValuesBuilder,
} from "../services/populate.services.js";

(async function populateTables() {
  // we first need to insert into affinity and homeworld
  // as users has some columns contains foreign key
  let { affinities, planets, characters } = dataManager;
  console.log("YEAHH", affinities, planets);
  const affinityQuery = affinityValuesBuilder(affinities);

  await executeQuery(affinityQuery);

  const planetsQuery = planetsValuesBuilder(planets);
  await executeQuery(planetsQuery);

  // And now we can populate users table

  const usersQuery = userValuesBuilder(characters);
  await executeQuery(usersQuery);
})();
