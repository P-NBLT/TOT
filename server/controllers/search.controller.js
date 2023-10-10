import * as searchProcedures from "../procedures/search.procedure.js";
import { search } from "../services/search.service.js";

export async function searchFriendAndChatByQuery(req, res) {
  const { query, id } = req.query;
  console.log({ query, id });
  try {
    const response = await search(searchProcedures.friendsAndMessagesQuery, [
      id,
      `%${query}%`,
    ]);
    console.log(response);
    const friends = [];
    const chats = [];
    if (response.length > 0) {
      for (let result of response) {
        if (chats.length === 3 && friends.length === 3) break;
        result.profilePic = null; // for development only. to delete once image will be hosted in db;
        if (result.content && chats.length < 3) {
          chats.push(result);
        }
        if (friends.length < 3) friends.push(result);
      }
    }

    return res.status(200).json({ chats, friends });
  } catch (e) {
    return { success: false, error: e };
  }
}
