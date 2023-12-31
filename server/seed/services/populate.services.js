import User from "../../models/User.js";
import { concatValues } from "../../utils/databaseQuery.js";

function affinityValuesBuilder(affinities) {
  let values = "";
  for (let affinity of affinities) {
    let value = `('${affinity}')`;
    values = concatValues(value, values, affinity, affinities);
  }
  return `insert into affinity (name)
          Values ${values}`;
}

function userValuesBuilder(characters) {
  let values = "";

  for (let character of characters) {
    let value = `('${character.email}', ${true})`;

    values = concatValues(value, values, character, characters);
  }

  return `insert into users (email, is_verified)
        VALUES ${values}`;
}
async function profileValuesBuilder(characters) {
  let values = "";

  for (let character of characters) {
    const user_id = await User.get(
      `SELECT users.id
       FROM users
       WHERE users.email = $1`,
      [character.email]
    );

    let value = `(${user_id[0].id},'${character.name}', 'user', ${true}, '${
      character.side
    }', '${character.affinity}', '${character.homeworld}')`;

    values = concatValues(value, values, character, characters);
  }

  return `insert into profile (user_id, username, "role", bot, side, affinity_name, homeworld_name)
        VALUES ${values}`;
}

function planetsValuesBuilder(planets) {
  let values = "";

  for (let planet of planets) {
    let value = `('${planet.name}', '${planet.rotation_period}','${planet.orbital_period}', '${planet.diameter}', '${planet.climate}', '${planet.gravity}', '${planet.terrain}', '${planet.surface_water}', '${planet.population}')`;
    values = concatValues(value, values, planet, planets);
  }

  return `insert into planets (name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population)
          VALUES ${values}`;
}

export {
  userValuesBuilder,
  planetsValuesBuilder,
  affinityValuesBuilder,
  profileValuesBuilder,
};
