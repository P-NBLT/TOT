import { executeQuery } from "../utils/databaseQuery.js";
import bcrypt from "bcrypt";
import { config } from "../config/index.js";

const User = {
  createLocal: async function createUserLocal(userInfo) {
    const { password, email, token } = userInfo;
    let lowerCaseEmail = email.toLowerCase();
    try {
      const hashedPassword = await bcrypt.hash(password, Number(config.SALT));
      const userQuery = `INSERT INTO users (email, password, email_verification_token)
                         VALUES($1, $2, $3)
                         RETURNING users.id, users.email
    `;
      const userValues = [lowerCaseEmail, hashedPassword, token];
      const user = await executeQuery(userQuery, userValues);
      return user;
    } catch (err) {
      console.log(err.message);
      return { success: false, errorMessage: err.message };
    }
  },
  setLocalUserToVerified: async function setVerify(token) {
    try {
      const query = `UPDATE users
                     SET is_verified = $1
                     WHERE users.email_verification_token = $2
                     RETURNING users.id, users.email;`;

      const values = [true, token];
      const user = await executeQuery(query, values);
      if (user.length === 0) return false;
      return user[0];
    } catch (e) {
      console.log(err);
    }
  },
  createOrFindOauth: async function createOrFindUserOauth(userInfo) {
    const { id, email, provider, accessToken, refershToken } = userInfo;

    try {
      const isUserExist = await this.findUserByOauthId(id);

      if (isUserExist.oauth_id) {
        if (refershToken) {
          const query = `UPDATE users 
             SET access_token = $1 
             WHERE users.oauth_id = $2 
             RETURNING *`;
          const user = await executeQuery(query, [refershToken, id]);
          return user;
        }
        return isUserExist;
      } else {
        const userQuery = `INSERT INTO users (email, oauth_provider, oauth_id, oauth_access_token, is_verified)
                           VALUES($1, $2, $3, $4, $5)
                           RETURNING users.id, users.email, users.oauth_provider, oauth_access_token`;

        const userValues = [email, provider, id, accessToken, true];
        const user = await executeQuery(userQuery, userValues);
        return user[0];
      }
    } catch (err) {
      console.log(err);
      return { success: false, errorMessage: err.message };
    }
  },
  findUserByEmail: async function findUserByEmail(email) {
    try {
      const query = `SELECT *
                     FROM users 
                     WHERE users.email = $1`;
      const lowerCaseEmail = email.toLowerCase();
      const values = [lowerCaseEmail];
      const response = await executeQuery(query, values);
      if (response.length === 0) return false;
      const user = response[0];
      return user;
    } catch (err) {
      return { success: false, errorMessage: err.message };
    }
  },
  findUserById: async function findById(id) {
    try {
      const query = `SELECT *
                     FROM users
                     WHERE users.id = $1`;
      const values = [id];
      const response = await executeQuery(query, values);
      if (response.length === 0) return false;
      const user = response[0];
      return user;
    } catch (err) {
      return { success: false, errorMessage: err.message };
    }
  },
  findUserByOauthId: async function findById(id) {
    try {
      const query = `SELECT *
                     FROM users 
                     WHERE users.oauth_id = $1`;
      const values = [id];
      const response = await executeQuery(query, values);
      if (response.length === 0) return false;
      const user = response[0];
      return user;
    } catch (err) {
      return { success: false, errorMessage: err.message };
    }
  },
  get: async function get(query, values) {
    try {
      const result = await executeQuery(query, values);
      return result;
    } catch (err) {
      return { success: false, errorMessage: err.message };
    }
  },
};

export default User;
