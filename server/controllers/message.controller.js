import Message from "../models/Message.js";
import chiefBot from "../services/botManager.service.js";

export async function sendMessageToBot(req, res) {
  const { message, senderId, botId, chatId } = req.body;

  try {
    //first we want to send message to the db
    const message1 = await Message.storeMessage(message, senderId, chatId);

    // Then retrieve the history.
    const history = await Message.getMessages(senderId, botId, chatId);

    // when we have history we send the messages to bot
    const response = await chiefBot.channelMessage(history, botId[0]);

    const message2 = await Message.storeMessage(
      response.data.choices[0].message,
      botId[0],
      chatId
    );

    return res.status(201).json(message2);
  } catch (err) {
    return res
      .status(501)
      .json({ message: "something went wrong", err: err.message });
  }
}
export async function sendMessageToUser(req, res) {
  const { message, sender_id, chat_id } = req.body;

  try {
    const message1 = await Message.storeMessage(message, sender_id, chat_id);

    return res.status(201).json({ message: "successfuly sent" });
  } catch (err) {
    return res
      .status(501)
      .json({ message: "something went wrong", err: err.message });
  }
}
