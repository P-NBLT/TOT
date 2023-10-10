import Message from "../models/Message.js";

export async function getMessagesByRoomId(roomId, offset) {
  try {
    return await Message.getMessagesByChatId({ chatId: roomId, offset });
  } catch (e) {
    throw new Error(
      `Couldn't fetch messages for roomId ${roomId}. Error: ${e}`
    );
  }
}
