import { sendQuery } from "../utils/sendQuery.js";
import {
  createAffinityQuery,
  createCommentsQuery,
  createFriendshipQuery,
  createPlanetsQuery,
  createPostsQuery,
  createProfileQuery,
  createUsersQuery,
  createUsersChatQuery,
  createMessageTableQuery,
  createChatsTableQuery,
  createTypeQuery,
} from "./queries.js";

async function createTables(isInit) {
  const query = `${isInit ? createTypeQuery : ""}
  ${createPlanetsQuery}
  ${createAffinityQuery}
  ${createUsersQuery}
  ${createPostsQuery}
  ${createProfileQuery}
  ${createCommentsQuery}
  ${createFriendshipQuery}
  ${createChatsTableQuery}
  ${createMessageTableQuery}
  ${createUsersChatQuery}`;

  await sendQuery(query);
}

export default createTables;
