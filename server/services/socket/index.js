import { EVENTS_LISTENER, EVENTS_EMITTERS } from "./events.js";
import Message from "../../models/Message.js";
import * as messageServices from "../message.service.js";
import Chat from "../../models/Chat.js";
import Profile from "../../models/Profile.js";

export async function socketAuthenticate(socket) {
  try {
    const { user } = socket.request;
    if (!user) throw new Error("Unauthenticated! Can't use socket");
    return user;
  } catch (err) {
    console.log(err.message);
  }
}

export async function initUser(socket, user) {
  const { id: userId, email } = user;

  socket.on(EVENTS_LISTENER.disconnect, (reason) => {
    console.log("socket disconnected", reason);
  });

  socket.on(EVENTS_LISTENER.joinRoom, async (roomId, cb) => {
    console.log("joined room", roomId);
    socket.join(roomId);
    const messages = await messageServices.getMessagesByRoomId(roomId);
    console.log(messages);
    cb(messages);
    return;
  });

  socket.on(EVENTS_LISTENER.leaveRoom, (roomId) => {
    console.log("leaving room", roomId);
    socket.leave(roomId);
    console.log(socket.rooms);
  });

  socket.on(EVENTS_LISTENER.incommingMessage, async (message, roomId, cb) => {
    const storedMessage = await Message.storeMessage(message, userId, roomId);
    console.log("stored message", storedMessage);
    const recipients = await Chat.retrieveUsersId(userId, roomId);

    if (recipients.length === 1) {
      await sendPrivateMessage({
        socket,
        message,
        roomId,
        recipientId: recipients[0].user_id,
        cb,
        timestamp: storedMessage.created_at,
      });
    }
    // group messages will be developped in the futur.
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
}

async function sendPrivateMessage({
  socket,
  message,
  roomId,
  cb,
  recipientId,
  timestamp,
}) {
  const isBot = await Profile.isBot(recipientId);
  //if bot => use botManager and send the response back. this will be implemented from a different branch
  if (isBot) {
    cb("Bot response", timestamp, isBot.username, recipientId);
    return;
  }
  // else
  socket
    .to(roomId)
    .emit(EVENTS_EMITTERS.sendMessage, message, recipientId, timestamp);
  return;
}
