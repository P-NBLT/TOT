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
};

export default Message;
