import passport from "passport";
import User from "../models/User.js";
import * as authServices from "../services/auth.service.js";
import { v4 as uuidv4 } from "uuid";
import * as responseHelper from "../utils/responseHelper.js";

export async function createUser(req, res, next) {
  try {
    const { password, email } = req.body;
    console.log("EMAIL", email);
    const token = uuidv4();

    //if we are going to register the user
    //from a password authentification then

    await User.createLocal({ email, password, token });

    await authServices.sendEmailVerification(email, token);

    return res.status(201).json(responseHelper.success());
  } catch (err) {
    if (err.status === 409) {
      // to avoid email fishing.
      return res
        .status(400)
        .json(responseHelper.error("Sorry we could't proceed to your request"));
    }
    return res.status(err.status).json(responseHelper.error(err));
  }
}

export async function setUserAsVerified(req, res) {
  const { token } = req.query;

  try {
    const verifiedUser = await User.setLocalUserToVerified(token);

    // if user.id => user just been verified then log him in;
    // if message => user already been verified and been loged previously. no automatic login
    // if false => no account found

    if (verifiedUser.id) {
      req.login(verifiedUser, (err, done) => {
        if (err) {
          return done(err);
        }
        return res.status(201).json({ user: req.user });
      });
    } else if (verifiedUser.message === "Already verified") {
      res.status(200).json(
        responseHelper.success({
          message: "Your account has already been verified. Please login.",
        })
      );
    } else if (!verifiedUser) {
      return res
        .status(400)
        .json(responseHelper.success({ message: "Token invalid" }));
    }
  } catch (e) {
    res.status(500).json(responseHelper.error(err));
  }
}

// login is handled with passport. see ./server/utils/passport
// below is just how we are handling the possbible errors (info) being an error manually thrown
// req.login is here to serialize the user and store the session data.
export async function loginUser(req, res) {
  passport.authenticate("local", (err, user, info) => {
    //execution error
    if (err) {
      return res.status(501).json(responseHelper.error(err));
    }
    //error from the user side
    if (info) {
      if (info.type === "email/password")
        return res.status(401).json(responseHelper.discontent(info));
      if (info.type === "unverified")
        return res.status(401).json(responseHelper.discontent(info));
    }

    req.login(user, (err) => {
      if (err) {
        return res
          .status(501)
          .json(
            responseHelper.error("Something went wrong while login you in")
          );
      }

      return res.status(200).json(
        responseHelper.success({
          user: {
            id: req.user.id,
            username: req.user.username,
            side: req.user.side,
            affinity: req.user.affinity,
            profilePic: req.user.profilePic,
          },
        })
      );
    });
  })(req, res);
}

export async function verifyAuthentification(req, res) {
  try {
    if (req.isAuthenticated()) {
      res.status(200).json(
        responseHelper.success({
          message: "you are authenticted",
          user: {
            id: req.user.id,
            username: req.user.username,
            side: req.user.side,
            affinity: req.user.faction,
            profilePic: req.user.profilePic,
          },
        })
      );
    } else
      return res.status(401).json(
        responseHelper.discontent({
          message: "you are not authenticted",
          user: null,
        })
      );
  } catch (error) {
    return res.status(500).json(responseHelper.error(error));
  }
}
