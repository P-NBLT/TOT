import { sendQuery } from "../utils/sendQuery.js";
import {
  createAffinityQuery,
  createCommentsQuery,
  createFriendshipQuery,
  createPlanetsQuery,
  createPostsQuery,
  createPublicMessagesQuery,
  createUsersCredentialsQuery,
  createUsersQuery,
} from "./queries.js";

(async function createTables() {
  const query = `${createPlanetsQuery}
  ${createAffinityQuery}
  ${createUsersQuery}
  ${createPostsQuery}
  ${createUsersCredentialsQuery}
  ${createCommentsQuery}
  ${createFriendshipQuery}
  ${createPublicMessagesQuery}`;

  await sendQuery(query);
})();
