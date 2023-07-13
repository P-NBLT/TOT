import { executeQuery } from "../utils/databaseQuery.js";
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
  findProfileByUserID: async function findProfileByID(userID) {
    try {
      const query = `SELECT username
                       FROM profile
                       WHERE user_id = $1;`;

      const response = await executeQuery(query, [userID]);

      if (response.length === 0) return false;
      return response[0];
    } catch (err) {
      return { success: false, errorMessage: err.message };
    }
  },
};

export default Profile;
