import { executeQuery } from "../../utils/databaseQuery.js";

export async function friendshipBuilder(alliance) {
  const getLightSideQuery = `SELECT users.username as name, users.id as id 
    FROM users 
    WHERE users.affinity_name in (${alliance.join(",")})`;

  const characters = await executeQuery(getLightSideQuery);

  let values = linkBuilder(characters);
  const query = `Insert into friendship (requester_id , addressee_id )
    values ${values.join("")}`;

  await executeQuery(query);
}

function linkBuilder(characters) {
  const values = [];
  for (let idx in characters) {
    let i = Number(idx) + 1;
    let currentCharacter = characters[idx].id;
    while (i < characters.length) {
      let subsequentCharacter = characters[i].id;
      if (idx == characters.length - 2) {
        var value = `(${currentCharacter}, ${subsequentCharacter}), (${subsequentCharacter}, ${currentCharacter});`;
      } else {
        var value = `(${currentCharacter}, ${subsequentCharacter}),(${subsequentCharacter}, ${currentCharacter}),`;
      }
      i++;
      values.push(value);
    }
  }
  return values;
}
