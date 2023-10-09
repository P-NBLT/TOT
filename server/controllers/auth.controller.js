import passport from "passport";
import User from "../models/User.js";
import * as authServices from "../services/auth.service.js";
import { v4 as uuidv4 } from "uuid";

export async function createUser(req, res, next) {
  try {
    const { password, email } = req.body;
    console.log("EMAIL", email);
    const token = uuidv4();

    //if we are going to register the user
    //from a password authentification then

    const user = await User.createLocal({ email, password, token });

    if (user.success === false) {
      res.status(409).json({ message: user.errorMessage });
    } else {
      await authServices.sendEmailVerification(email, token);
      return res.status(201).json({ message: "success" });
    }
  } catch (err) {
    res.status(501).json(err);
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
      res.status(200).json({
        message: "Your account has already been verified. Please login.",
      });
    } else if (!verifiedUser) {
      return res.status().json({ message: "Token invalid" });
    }
  } catch (e) {
    res.status(501).json({ message: e });
  }
}

// login is handled with passport. see ./server/utils/passport
// below is just how we are handling the possbible errors (info) being an error manually thrown
// req.login is here to serialize the user and store the session data.
export async function loginUser(req, res) {
  passport.authenticate("local", (err, user, info) => {
    //execution error
    if (err) {
      return res.status(501).json(err);
    }
    //error from the user side
    if (info) {
      if (info.type === "email/password") return res.status(401).json(info);
      if (info.type === "unverified") return res.status(401).json(info);
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(501).json({
          message: `Something went wrong while login you in: ${err.message}`,
        });
      }

      return res.status(200).json({
        user: {
          id: req.user.id,
          username: req.user.username,
          side: req.user.side,
          affinity: req.user.affinity,
        },
      });
    });
  })(req, res);
}

export async function verifyAuthentification(req, res) {
  if (req.isAuthenticated()) {
    res.status(200).json({
      message: "you are authenticted",
      user: {
        id: req.user.id,
        username: req.user.username,
        side: req.user.side,
        affinity: req.user.faction,
      },
    });
  } else
    return res
      .status(401)
      .json({ message: "you are not authenticted", user: null });
}
