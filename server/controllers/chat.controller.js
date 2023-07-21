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
