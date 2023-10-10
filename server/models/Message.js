import { executeQuery } from "../utils/databaseQuery.js";

const Message = {
  storeMessage: async function storeMessage(message, userId, chatId) {
    try {
      const messageQuery = `INSERT INTO messages (chat_id, user_id, message)
                            VALUES ($1, $2, $3)
                            RETURNING *;`;
      const values = [chatId, userId, message];
      const response = await executeQuery(messageQuery, values);
      const updateChatQuery = `UPDATE chats
                               SET last_activity = NOW()
                               WHERE chat_id = $1;`;
      await executeQuery(updateChatQuery, [chatId]);
      return response[0];
    } catch (err) {
      console.log(err);
      return { success: false, errorMessage: err.message };
    }
  },

  getMessagesByChatId: async function getMessagesByCahtId({
    chatId,
    offset = 0,
  }) {
    try {
      const query = `  WITH UserChats AS (
        SELECT uc.user_id, uc.chat_id
        FROM users_chats uc
        WHERE uc.chat_id = $1
      ),
      Profiles AS (
      SELECT username, user_id
      FROM profile 
      ),
      Last_Messages AS (
        SELECT m.message_id, m.created_at as timestamp, m.message, m.chat_id, m.user_id
        FROM messages m
        WHERE m.chat_id = $1
        ORDER BY m.created_at DESC
        LIMIT 10
        OFFSET 10 * $2
      )
      SELECT c.chat_id as "roomId", c.chat_name as "roomName",  p.user_id, p.username, lm.message_id, lm.timestamp, lm.message as content
      FROM Last_Messages lm
      JOIN UserChats uc ON lm.user_id = uc.user_id AND lm.chat_id = uc.chat_id
      JOIN Profiles p ON lm.user_id = p.user_id
      JOIN chats c ON lm.chat_id = c.chat_id
      ORDER BY lm.timestamp ASC;`;
      const values = [chatId, offset];
      const response = await executeQuery(query, values);

      if (response.length > 0) return response;
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  },
};

export default Message;
