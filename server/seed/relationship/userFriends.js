import inquirer from "inquirer";
import { executeQuery } from "../../utils/databaseQuery.js";

const indexLimit = 75;

async function buildRelationship() {
  const response = await inquirer.prompt([
    {
      type: "input",
      name: "userId",
      message:
        "write the user Id you would like to build the relationship for.",
    },
  ]);
  const userId = Number(response.userId);

  const queryBots = `SELECT id FROM profile WHERE bot = $1`;
  const bots = await executeQuery(queryBots, [true]);
  const values = linkBuilderForUser(bots, userId);
  const query = `INSERT INTO friendship (requester_id , addressee_id)
  values ${values.join("")}`;
  await executeQuery(query);
}

function linkBuilderForUser(bots, userId) {
  const values = [];
  let idx = 0;
  for (let bot of bots) {
    const botId = bot.id;
    if (idx === bots.length - 1) {
      var value = `(${userId}, ${botId}), (${botId}, ${userId});`;
    } else var value = `(${userId}, ${botId}), (${botId}, ${userId}),`;
    idx++;
    values.push(value);
  }

  return values;
}

buildRelationship();
