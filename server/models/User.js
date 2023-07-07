import { executeQuery } from "../utils/databaseQuery.js";
import { errorQueryDataBase } from "../utils/error.js";

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
                         RETURNING users.id
    `;
      const userValues = [
        username,
        role,
        bot,
        affinity_name,
        homeworld_name,
        email,
      ];
      const response = await executeQuery(
        userQuery,
        userValues,
        errorQueryDataBase
      );
      const userId = response[0].id;
      const credentialsQuery = `INSERT INTO users_credentials (user_id, password)
                                VALUES ($1, $2)`;
      const credentialsValues = [userId, password];
      await executeQuery(
        credentialsQuery,
        credentialsValues,
        errorQueryDataBase
      );
    } catch (err) {
      console.log(err);
      return false;
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
                         RETURNING users.id 
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
      const response = await executeQuery(
        userQuery,
        userValues,
        errorQueryDataBase
      );
      return response;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};
