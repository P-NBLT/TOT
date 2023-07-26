import Profile from "../models/Profile.js";

export async function createUserProfile(req, res) {
  const { username, affinity, side } = req.body;
  const { user } = req;

  try {
    await Profile.createProfile({
      username,
      affinity,
      side,
      id: user.id,
    });

    user.username = username;
    return res.status(201).json({ user: req.user });
  } catch (err) {
    console.log(err);
    return res
      .status(501)
      .json({ message: `Something went wrong while creating the profile` });
  }
}

export async function getUserProfile(req, res) {
  try {
    const { userId } = req.params;
    const userProfile = await Profile.findProfileByUserID(userId, [
      "username, bot",
    ]);
    if (userProfile) return res.status(200).json(userProfile);
    else
      return res
        .status(404)
        .json({ message: "This profile does't seem to exist" });
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .json({ message: `Something went wrong while fetching the profile` });
  }
}

export async function getUsersProfile(req, res) {
  try {
    let options = null;
    let keys = Object.keys(req.query);
    if (keys.length > 0) options = keys;

    const usersProfile = await Profile.getAllProfiles(options);

    if (usersProfile) return res.status(200).json(usersProfile);
    else return res.status(404).json({ message: "Something went wrong" });
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .json({ message: `Something went wrong while fetching the profiles` });
  }
}
