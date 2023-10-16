import Message from "../models/Message.js";
import chiefBot from "./bot/botManager.service.js";

export async function getMessagesByRoomId(roomId, offset) {
  try {
    return await Message.getMessagesByChatId({ chatId: roomId, offset });
  } catch (e) {
    throw new Error(
      `Couldn't fetch messages for roomId ${roomId}. Error: ${e}`
    );
  }
}

export async function sendMessageToBot(message, botId, chatId) {
  try {
    const botResponse = await chiefBot.channelMessage(message, botId);

    await Message.storeMessage(botResponse, botId, chatId);

    return botResponse;
    // return response.choices[0].message.content;
  } catch (err) {
    console.log(err);
  }
}
