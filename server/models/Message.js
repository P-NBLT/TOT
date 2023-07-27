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
  getMessages: async function fetchMessage(
    senderId,
    recipientId,
    chatId,
    page = 1
  ) {
    try {
      const query = `SELECT * 
                     FROM messages
                     WHERE user_id IN ($1, $2) AND chat_id = $3
                     ORDER BY created_at DESC
                     LIMIT 10 * $4;`;
      const values = [senderId, recipientId[0], chatId, page];

      const messages = await executeQuery(query, values);

      return messages;
    } catch (err) {
      console.log(err);
      return { success: false, errorMessage: err.message };
    }
  },
};

export default Message;
