import Profile from "../models/Profile.js";

export async function getProfile(user) {
  const profile = await Profile.findProfileByUserID(user.id, ["username"]);
  console.log("Profile", profile);
  if (profile)
    user = {
      ...user,
      username: profile.username,
      side: profile.side,
      faction: profile.affinity_name,
    };
  return user;
}
