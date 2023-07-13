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
    res
      .status(501)
      .json({ message: `Something went wrong while creating the profile` });
  }
}
