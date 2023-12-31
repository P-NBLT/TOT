import Profile from "../models/Profile.js";
import etag from "etag";
import * as responseHelper from "../utils/responseHelper.js";

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
    return res.status(201).json(responseHelper.success({ user: req.user }));
  } catch (err) {
    return res
      .status(501)
      .json(
        responseHelper.error(`Something went wrong while creating the profile`)
      );
  }
}

export async function getUserProfile(req, res) {
  try {
    const { userId } = req.params;
    const userProfile = await Profile.findProfileByUserID(userId, [
      "username, bot, id",
    ]);
    if (userProfile)
      return res.status(200).json(responseHelper.success(userProfile));
    else
      return res
        .status(404)
        .json(responseHelper.discontent("This profile does't seem to exist"));
  } catch (err) {
    res
      .status(501)
      .json(
        responseHelper.error(`Something went wrong while fetching the profile`)
      );
  }
}

export async function getUsersProfile(req, res) {
  try {
    let options = null;
    let keys = Object.keys(req.query);
    if (keys.length > 0) options = keys;

    const usersProfile = await Profile.getAllProfiles(options);

    if (usersProfile)
      return res.status(200).json(responseHelper.success(usersProfile));
    else
      return res
        .status(404)
        .json(responseHelper.discontent("We couldn't find your profile."));
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .json(
        responseHelper.error(`Something went wrong while fetching the profiles`)
      );
  }
}

export async function getPreviewProfileData(req, res) {
  try {
    console.log("REQ", req.user);
    if (req.isAuthenticated()) {
      const clientETag = req.headers["if-none-match"];
      const currentETag = etag(JSON.stringify(req.user));
      console.log(clientETag, clientETag === currentETag);
      if (clientETag === currentETag) {
        res.status(304).send(); // Not Modified
      } else {
        return res
          .status(200)
          .set("Cache-Control", "public, max-age=604800")
          .setHeader("ETag", currentETag)
          .json(
            responseHelper.success({
              message: "you are authenticted",
              user: {
                id: req.user.id,
                username: req.user.username,
                side: req.user.side,
                affinity: req.user.affinity,
                profilePic: req.user.profilePic,
              },
            })
          );
      }
    } else
      return res.status(401).json(
        responseHelper.discontent({
          message: "you are not authenticted",
          user: null,
        })
      );
  } catch (err) {
    res.status(500).json(responseHelper.error(err));
  }
}
