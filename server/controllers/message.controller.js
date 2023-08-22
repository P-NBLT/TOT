import Message from "../models/Message.js";
import chiefBot from "../services/bot/botManager.service.js";

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

export async function botChannels(req, res) {
  const { message, senderId, recipientId, chatId } = req.body;

  try {
    console.log(message, senderId, recipientId, chatId);
    const message1 = await Message.storeMessage(message, senderId, chatId);

    // Then retrieve the history.
    const history = await Message.getGroupMessage(chatId);
    console.log("historyyy", history);
    // const botsAvailable= {
    //   'Luke': 1, // name and id
    //   "Yoda": 6,
    //   "Vader": 4
    // }

    const botsAvailable = [
      ["luke", 1],
      ["yoda", 6],
      ["vader", 4],
    ];

    // if the prompt contain the bot name then the message should be directde to that bot
    const a = [];
    const messageLowerCase = message.toLowerCase();
    for (let [k, v] of botsAvailable) {
      if (messageLowerCase.includes(k)) {
        const response = await chiefBot.channelMessage(history, v);

        const response2 = await Message.storeMessage(
          response.data.choices[0].message,
          v,
          chatId
        );
        a.push(response2);
      } else {
        const response = await chiefBot.channelMessage(history, v);

        const response2 = await Message.storeMessage(
          response.data.choices[0].message,
          v,
          chatId
        );
        a.push(response2);
        setTimeout(() => {}, 2000);
      }
    }
    res.status(201).json(a);
    // when we have history we send the messages to bot
    // const response = await chiefBot.channelMessage(history, recipientId[0]);

    // const message2 = await Message.storeMessage(
    //   response.data.choices[0].message,
    //   botId[0],
    //   chatId
    // );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
