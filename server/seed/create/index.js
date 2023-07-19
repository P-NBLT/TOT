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
} from "./queries.js";

(async function createTables() {
  const query = `${createPlanetsQuery}
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
})();
