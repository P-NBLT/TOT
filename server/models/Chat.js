import { executeQuery, concatValues } from "../utils/databaseQuery.js";

const Chat = {
  createRoom: async function createRoom(users) {
    try {
      const isCollision = await this.checkSingleRoomCollision(users);
      if (isCollision) return { success: false, message: "Room already exist" };
      // create chat room
      const chatQuery = `INSERT INTO chats (members_count, chat_type)
                       VALUES($1, $2)
                       RETURNING *`;
      const membersCount = 2; // single room can only have 2 users
      const chatType = "1_to_1";
      const values = [membersCount, chatType];
      const chatRoom = await executeQuery(chatQuery, values);

      // establish relation between the users and the chat room

      const usersChatQuery = `INSERT INTO users_chats (user_id, chat_id)
                              VALUES($1, $3),($2, $3);`;
      const user1 = users[0];
      const user2 = users[1];
      const users_chatValues = [user1, user2, chatRoom[0].chat_id];
      await executeQuery(usersChatQuery, users_chatValues);
      return chatRoom;
    } catch (err) {
      console.log(err);
      return { success: false, errorMessage: err.message };
    }
  },
  createGroupRoom: async function createGroupRoom(name, users) {
    // create chat room

    const chatQuery = `INSERT INTO chats (chat_name, members_count, chat_type)
                       VALUES($1, $2, $3)
                       RETURNING *`;
    const membersCount = users.length;
    const chatType = "group";
    const values = [name, membersCount, chatType];
    const chatRoom = await executeQuery(chatQuery, values);

    // establish relation between the users and the chat room

    const usersChatQuery = `INSERT INTO users_chats (user_id, chat_id)
    VALUES ${usersChatsValuesBuilder(users, chatRoom[0].chat_id)}`;

    const usersChatValues = [
      usersChatsValuesBuilder(users, chatRoom[0].chat_id),
    ];
    console.log(usersChatValues);
    await executeQuery(usersChatQuery);
    return chatRoom;
  },
  checkSingleRoomCollision: async function (users) {
    const user1 = users[0];
    const user2 = users[1];

    //  we check if both users have already their own single room

    const users_chatsQuery = `SELECT uc.chat_id, c.chat_type
                              FROM users_chats AS uc
                              JOIN chats AS c ON uc.chat_id = c.chat_id
                              WHERE uc.user_id IN ($1, $2) AND c.chat_type = '1_to_1'
                              GROUP BY uc.chat_id, c.chat_type
                              HAVING COUNT(DISTINCT uc.user_id) = 2;`;

    const values = [user1, user2];
    const response = await executeQuery(users_chatsQuery, values);
    if (response.length === 0) {
      return false; // meaning both users don't have their own single room
    } else return true;
  },
};

export default Chat;

function usersChatsValuesBuilder(users, chatId) {
  let values = "";

  for (let user of users) {
    let value = `(${user}, ${chatId})`;
    values = concatValues(value, values, user, users);
  }

  return values;
}
