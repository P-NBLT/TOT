import { executeQuery, selectOptionsHandler } from "../utils/databaseQuery.js";
import User from "./User.js";

const Profile = {
  createProfile: async function (profileInfo) {
    const {
      username,
      role = "user",
      bot = false,
      affinity,
      side,
      homeworld = "Earth",
      id,
    } = profileInfo;

    try {
      const user = await User.findUserById(id);

      const profileQuery = `INSERT INTO profile (user_id, username, role, bot, affinity_name, side, homeworld_name)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, username, homeworld_name as homeworld, affinity_name as affinity;`;

      const values = [user.id, username, role, bot, affinity, side, homeworld];

      const userProfile = await executeQuery(profileQuery, values);
      return userProfile;
    } catch (err) {
      return { success: false, errorMessage: err.message };
    }
  },
  findProfileByUserID: async function findProfileByID(userID, selectOption) {
    try {
      let optionReturnedColumn = selectOptionsHandler(selectOption);
      const values = [userID];

      const query = `SELECT users.id, profile.username, profile.bot FROM users, profile
      WHERE users.id = $1 AND users.id = profile.user_id;`;

      const response = await executeQuery(query, values);

      if (response.length === 0) return false;
      return response[0];
    } catch (err) {
      return { success: false, errorMessage: err.message };
    }
  },
  getAllProfiles: async function getAllProfiles(selectOptions) {
    try {
      let optionReturnedColumn = selectOptionsHandler(selectOptions);

      const query = `SELECT ${optionReturnedColumn}
                     FROM profile`;
      const profiles = await executeQuery(query);
      return profiles;
    } catch (err) {
      return { success: false, errorMessage: err.message };
    }
  },
  isBot: async function checkForBot(userId) {
    try {
      const query = `SELECT user_id, bot FROM profile WHERE user_id = $1`;
      const value = [userId];
      const response = await executeQuery(query, value);
      return response[0].bot;
    } catch (e) {
      console.log(e);
    }
  },
};

export default Profile;
