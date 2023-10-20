import { executeQuery } from "../../utils/databaseQuery.js";
import inquirer from "inquirer";

async function createRooms() {
  const response = await inquirer.prompt([
    {
      type: "input",
      name: "userId",
      message: "write the user Id you would like to build the chat for.",
    },
    {
      type: "input",
      name: "roomCount",
      message:
        "Choose a number between 1 and 75. if room already exist with a bot then the total room created will be deducted for every room that already exists.",
    },
  ]);

  const userId = Number(response.userId);
  const roomCount = Number(response.roomCount);
  if (roomCount > 75)
    throw new Error(
      "There is only 75 bots in the database. Building rooms that are not related to bots is forbidden as you should not create room with real user algorithmically."
    );
  if (roomCount < 1)
    throw new Error("Your input must be greater or equal to 1");

  // return users id where userId has room with
  const existingRoomsWithUsers = `WITH ChatId AS (SELECT chat_id as chatId FROM users_chats
    WHERE user_id = $1
    GROUP BY 1
    )
    SELECT  user_id FROM users_chats 
    WHERE chat_id IN (SELECT chatId FROM ChatId)
    AND user_id <> $1
    GROUP BY user_id;`;

  const res = await executeQuery(existingRoomsWithUsers, [userId]);
  const usersId = res.map((el) => el.user_id);

  let createRoomsValuesQuery = queryBuilder(
    usersId,
    roomCount,
    "(2, '1_to_1')"
  );

  const createRoomsQuery = `INSERT INTO chats(members_count, chat_type)
      ${createRoomsValuesQuery}
      RETURNING chat_id`;

  const roomsIdRes = await executeQuery(createRoomsQuery);
  const roomsId = roomsIdRes.map((el) => el.chat_id);
  console.log(roomsIdRes, roomsId);

  if (roomsId.length === 0 || usersId.length >= roomCount - 1) return;
  let linkUsersToChatRoomValuesQuery = "VALUES ";

  for (let i = 0; i < roomCount; i++) {
    if (usersId.includes(i) || i === 0) continue;

    if (i === roomCount - 1) {
      linkUsersToChatRoomValuesQuery = linkUsersToChatRoomValuesQuery.concat(
        ` (${userId},${roomsId[roomsId.length - 1]}), (${i}, ${
          roomsId[roomsId.length - 1]
        })`
      );
    } else {
      linkUsersToChatRoomValuesQuery = linkUsersToChatRoomValuesQuery.concat(
        `(${userId},${roomsId[roomsId.length - 1]}), (${i}, ${
          roomsId[roomsId.length - 1]
        }),`
      );
    }
    roomsId.pop();
  }

  const linkUsersToChatRoomQuery = `INSERT INTO users_chats (user_id, chat_id)
    ${linkUsersToChatRoomValuesQuery};`;

  await executeQuery(linkUsersToChatRoomQuery);
}

createRooms();

function queryBuilder(usersId, iterable, value) {
  let query = "VALUES ";
  for (let i = 0; i < iterable - 1; i++) {
    if (usersId.includes(i)) continue;

    if (i === 0) query = query.concat(value);
    else query = query.concat(`, ${value}`);
  }
  return query;
}
