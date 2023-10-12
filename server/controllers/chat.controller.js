import Chat from "../models/Chat.js";
import * as responseHelper from "../utils/responseHelper.js";

export async function createSingleRoom(req, res, next) {
  const { users } = req.body;
  const chatRoom = await Chat.createRoom(users);
  if (chatRoom.interupted)
    return res.status(409).send(
      responseHelper.discontent({
        message: chatRoom.message,
      })
    );
  res.status(201).json({ chat: chatRoom[0] });
}

export async function createGroopRoom(req, res) {
  const { name, users } = req.body;
  const chatRoom = await Chat.createGroupRoom(name, users);
  if (chatRoom.interupted)
    return res
      .status(400)
      .send(responseHelper.discontent({ message: "couldn't create room" }));
  res.status(201).json(responseHelper.success({ chat: chatRoom[0] }));
}

export async function getRecentActiveChats(req, res) {
  try {
    const { userId } = req.params;
    const { offset } = req.query;
    console.log({ userId, offset });
    const chatRooms = await Chat.getUserChatDetailsWithLastMessages(
      userId,
      offset
    );
    console.log(chatRooms);
    // if (chatRooms.data.length > 0)
    return res.status(200).json(responseHelper.success(chatRooms));
    // if (chatRooms.data.length == 0)
    //   return res.status(200).json(responseHelper.success(chatRooms));
  } catch (err) {
    return res.status(501).json(responseHelper.error(err));
  }
}

export async function getAllRoomsByUser() {
  try {
    const { userId } = req.query;
    const results = await Chat.getAllRoomsByUserId(userId);
    return res.status(200).json(responseHelper.success(results));
  } catch (e) {
    res.status(501).json(responseHelper.error(e));
  }
}
