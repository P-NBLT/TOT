import Message from "../models/Message.js";
import * as messageServices from "../services/message.service.js";

export async function sendMessageToBot(req, res) {
  const { message, sender_id, recipient_id, chat_id } = req.body;

  try {
    const message1 = await Message.storeMessage(message, sender_id, chat_id);

    const response = { message: "Hello back" }; // in the near futur answer will be feeded by a bot

    const message2 = await Message.storeMessage(
      response.message,
      recipient_id[0],
      chat_id
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

export async function getMessagesByRoomId(req, res) {
  try {
    const { roomId } = req.params;
    const { offset } = req.query;

    const messages = await messageServices.getMessagesByRoomId(roomId, offset);

    return res.status(200).json(messages);
  } catch (e) {
    return res
      .status(501)
      .json({ success: false, message: "Something went wrong." });
  }
}
