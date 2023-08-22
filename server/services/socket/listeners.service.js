import { socketEmitters, socketListeners } from "./socketEvents.js";
import * as socketResponse from "./emitters.service.js";
import Message from "../../models/Message.js";
import chiefBot from "../bot/botManager.service.js";

export async function initUser(socket) {
  socket.on(
    socketListeners.userToBot,
    async (message, senderId, botId, chatId) => {
      console.log("MESSAGE", message);
      const response = await sendMessageToBot(message, senderId, botId, chatId);
      socketResponse.botResponse(socket, response);
    }
  );
}

export async function initBot(socket) {
  console.log("triggering Bot socket");
  socket.on(
    socketListeners.botMessage,
    async (message, senderId, recipientId, chatId) => {
      const response = await botChannels(
        message,
        senderId,
        recipientId,
        chatId
      );

      socketResponse.botResponse(socket, response);
    }
  );
}

async function sendMessageToBot(message, senderId, botId, chatId) {
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

    return response.data.choices[0].message.content;
  } catch (err) {
    console.log(err);
  }
}

async function botChannels(message, senderId, recipientId, chatId) {
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
    let isBot;
    botsAvailable.forEach(([botName, id]) => {
      if (id === senderId) isBot = true;
    });
    console.log("ISBOT", isBot);
    if (isBot) {
      const otherBots = botsAvailable.filter(([name, id]) => id !== senderId);
      const randomBot = otherBots[Math.floor(Math.random() * otherBots.length)];
      console.log("random bot", randomBot);
      const response = await chiefBot.channelMessage(history, randomBot[1]);

      const response2 = await Message.storeMessage(
        response.data.choices[0].message,
        randomBot[1],
        chatId
      );
      return response.data.choices[0].message.content;
    } else {
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
    }

    // when we have history we send the messages to bot
    // const response = await chiefBot.channelMessage(history, recipientId[0]);

    // const message2 = await Message.storeMessage(
    //   response.data.choices[0].message,
    //   botId[0],
    //   chatId
    // );
  } catch (err) {
    console.log(err);
  }
}
