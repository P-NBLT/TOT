import { executeQuery } from "../utils/databaseQuery.js";
import bcrypt from "bcrypt";
import { config } from "../config/index.js";

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
      const user = await executeQuery(userQuery, userValues);
      const userId = user[0].id;
      const credentialsQuery = `INSERT INTO users_credentials (user_id, password)
                                VALUES ($1, $2)
                                RETURNING *
                                `;

      const hashedPassword = await bcrypt.hash(password, Number(config.SALT));

      const credentialsValues = [userId, hashedPassword];
      await executeQuery(credentialsQuery, credentialsValues);
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
      const user = await executeQuery(userQuery, userValues);
      return user;
    } catch (err) {
      console.log(err);
      return { success: false, errorMessage: err.message };
    }
  },
  findUserByEmail: async function findUserByEmail(email) {
    try {
      console.log("TRIGGER FROM MODEL", email);
      const query = `SELECT *
                     FROM users 
                     WHERE users.email = $1`;
      const values = [email];
      const response = await executeQuery(query, values);
      const user = response[0];
      if (user.length === 0) return false;
      return user;
    } catch (err) {
      return { success: false, errorMessage: err.message };
    }
  },
  findUserLocalLogin: async function findUserLocalLogin(email) {
    try {
      const query = `SELECT users.email, users.id, users.username, users_credentials.password 
    FROM users, users_credentials 
    WHERE users.email = $1 AND users_credentials.user_id = users.id`;

      const values = [email];
      const response = await executeQuery(query, values);
      const user = response[0];
      if (user.length === 0) return false;
      return user;
    } catch (err) {
      return { success: false, errorMessage: err.message };
    }
  },
};

export default User;
