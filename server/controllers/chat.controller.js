import Chat from "../models/Chat.js";

export async function createSingleRoom(req, res, next) {
  const { users } = req.body;
  const chatRoom = await Chat.createRoom(users);
  if (chatRoom.success === false)
    return res.status(501).send({
      message: chatRoom.message || "Couldn't create room",
      err: chatRoom.errorMessage,
    });
  res.status(201).json({ chat: chatRoom[0] });
}

export async function createGroopRoom(req, res) {
  const { name, users } = req.body;
  const chatRoom = await Chat.createGroupRoom(name, users);
  if (chatRoom.success === false)
    return res
      .status(501)
      .send({ message: "couldn't create room", err: chatRoom.errorMessage });
  res.status(201).json({ chat: chatRoom[0] });
}

export async function getRecentActiveChats(req, res) {
  const { userId } = req.params;
  const { offset } = req.query;

  const chatRooms = await Chat.getUserChatDetailsWithLastMessages(
    userId,
    offset
  );

  if (chatRooms.data.length > 0) return res.status(200).json(chatRooms.data);
  if (chatRooms.data.length == 0)
    return res
      .status(200)
      .json({ data: chatRooms.data, message: chatRooms.message });
  else
    return res
      .status(501)
      .json({ ...chatRooms, message: "something went wrong" });
}

export async function getAllRoomsByUser() {
  try {
    const { userId } = req.query;
    const results = await Chat.getAllRoomsByUserId(userId);
    return res.status(200).json({ results });
  } catch (e) {
    res.status(501).json(e);
  }
}
