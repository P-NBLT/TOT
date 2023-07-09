import { executeQuery } from "../utils/databaseQuery.js";
import { errorQueryDataBase } from "../utils/error/databaseError.js";

const User = {
  createLocal: async function createUserLocal(userInfo) {
    const {
      username,
      password,
      role = "user",
      bot = false,
      affinity_name,
      homeworld_name = "Earth",
      email,
    } = userInfo;

    try {
      const userQuery = `INSERT INTO users (username, role, bot, affinity_name, homeworld_name, email)
                         VALUES($1, $2, $3, $4, $5, $6)
                         RETURNING users.id, users.username, users.homeworld_name as homworld, affinity_name as affinity
    `;
      const userValues = [
        username,
        role,
        bot,
        affinity_name,
        homeworld_name,
        email,
      ];
      const user = await executeQuery(
        userQuery,
        userValues,
        errorQueryDataBase
      );
      const userId = user[0].id;
      const credentialsQuery = `INSERT INTO users_credentials (user_id, password)
                                VALUES ($1, $2)
                                RETURNING *
                                `;
      const credentialsValues = [userId, password];
      await executeQuery(
        credentialsQuery,
        credentialsValues,
        errorQueryDataBase
      );
      return user;
    } catch (err) {
      console.log(err.message);
      return { success: false, errorMessage: err.message };
    }
  },
  createOauth: async function createUserOauth(userInfo) {
    const {
      username,
      role = "user",
      bot = false,
      affinity_name,
      homeworld_name = "Earth",
      email,
      oauth_provider,
      oauth_id,
      oauth_access_token,
    } = userInfo;

    try {
      const userQuery = `INSERT INTO users (username, role, bot, affinity_name, homeworld_name, email, oauth_provider, oauth_id, oauth_access_token)
                         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
                         RETURNING users.id, users.username, users.homeworld_name as homworld, affinity_name as affinity
    `;
      const userValues = [
        username,
        role,
        bot,
        affinity_name,
        homeworld_name,
        email,
        oauth_provider,
        oauth_id,
        oauth_access_token,
      ];
      const user = await executeQuery(
        userQuery,
        userValues,
        errorQueryDataBase
      );
      return user;
    } catch (err) {
      console.log(err);
      return { success: false, errorMessage: err.message };
    }
  },
};

export default User;
