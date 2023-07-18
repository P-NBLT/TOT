import Profile from "../models/Profile.js";
import User from "../models/User.js";

async function isLoggedInProd(req, res, next) {
  if (req.isAuthenticated() || req.headers.authorization) {
    next();
  } else
    res
      .status(401)
      .json({ message: "Not authenticated, please login.", user: req.user });
}

// because I am using postman to test my endpoint
// when it comes with oauth I can't set req.user from postman
// so I need to counter this by simulating a valid login.
// this is only for oauth and development with postman
async function developmentLoggedIn(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers["user-agent"].includes("PostmanRuntime")
  ) {
    if (!req.user) {
      const user = await User.get(
        `SELECT * FROM users WHERE users.oauth_id = $1 `,
        [req.headers.oauth_id]
      );

      const profile = await Profile.findProfileByUserID(user[0].id, [
        "username",
      ]);

      req.user = {
        id: user[0].id,
        email: user[0].email,
        ...(profile && { username: profile.username }),
      };
      return next();
    }
    return next();
  } else if (req.isAuthenticated()) {
    return next();
  } else {
    res
      .status(401)
      .json({ message: "Not authenticated, please login.", user: req.user });
  }
}

export const isLoggedIn =
  process.env.NODE_ENV === "development" ? developmentLoggedIn : isLoggedInProd;
