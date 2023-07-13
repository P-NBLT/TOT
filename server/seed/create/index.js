import { sendQuery } from "../utils/sendQuery.js";
import {
  createAffinityQuery,
  createCommentsQuery,
  createFriendshipQuery,
  createPlanetsQuery,
  createPostsQuery,
  createProfileQuery,
  createPublicMessagesQuery,
  createUsersQuery,
} from "./queries.js";

(async function createTables() {
  const query = `${createPlanetsQuery}
  ${createAffinityQuery}
  ${createUsersQuery}
  ${createPostsQuery}
  ${createProfileQuery}
  ${createCommentsQuery}
  ${createFriendshipQuery}
  ${createPublicMessagesQuery}`;

  await sendQuery(query);
})();
