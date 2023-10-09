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
  retrieveUsersId: async function (userId, roomId) {
    try {
      const query = `SELECT user_id FROM users_chats WHERE chat_id = $2 AND user_id != $1;`;
      const values = [userId, roomId];
      const response = await executeQuery(query, values);
      console.log("USER IDS", response);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  getAllRoomsByUserId: async function getAllRoomsByUserId(userId, limit = 1) {
    try {
      const query = `SELECT c.*
    FROM users_chats AS uc
    JOIN chats AS c ON uc.chat_id = c.chat_id
    WHERE uc.user_id = $1
    ORDER BY c.last_activity DESC
    LIMIT 15 * $2;`;

      const value = [userId, limit];

      const response = await executeQuery(query, value);
      return response;
    } catch (e) {
      return e;
    }
  },
  getUserChatDetailsWithLastMessages:
    async function getUserChatDetailsWithLastMessages(userId, offset = 0) {
      try {
        const query = `WITH Friends AS (
          SELECT
              CASE
                  WHEN f.requester_id = $1 THEN f.addressee_id
                  ELSE f.requester_id
              END as friend_id
          FROM friendship f
          WHERE f.requester_id = $1 
      ),
      UserAChats AS (
        SELECT chat_id
        FROM users_chats
        WHERE user_id = $1
      ),
      LastMessages AS (
          SELECT
              m.chat_id,
              m.created_at,
              m.message,
              m.user_id
          FROM messages m
          INNER JOIN (
              SELECT
                  chat_id,
                  MAX(created_at) as last_message_time
              FROM messages
              GROUP BY chat_id
          ) lm ON m.chat_id = lm.chat_id AND m.created_at = lm.last_message_time
      )
      SELECT
          p.username as "contactName",
          p.affinity_name as affinity,
          p.side,
          uc.chat_id as "roomId",
          c.last_activity as "timestamp",
          lm.message as content
      FROM Friends f
      INNER JOIN profile p ON f.friend_id = p.user_id
      LEFT JOIN users_chats uc ON f.friend_id = uc.user_id AND uc.chat_id IN (SELECT chat_id FROM UserAChats)
      LEFT JOIN chats c ON uc.chat_id = c.chat_id
      LEFT JOIN LastMessages lm ON c.chat_id = lm.chat_id
      WHERE lm.message IS NOT NULL
      ORDER BY c.last_activity DESC NULLS LAST
      LIMIT 10 
      OFFSET $2;`;

        const values = [userId, offset];

        const response = await executeQuery(query, values);

        if (response.length > 0) return { success: true, data: response };
        else return { success: true, data: [], message: "no result found" };
      } catch (e) {
        console.log(e);
        return { success: false, data: null };
      }
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
