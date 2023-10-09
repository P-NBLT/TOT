import express from "express";
import * as authController from "../controllers/auth.controller.js";
import passport from "passport";
import { config } from "../config/index.js";

const router = express.Router();

/*  ______________
 *   LOCAL SIGNIN
 *  ______________
 */

router.get("/verify", authController.verifyAuthentification);

router.post("/signup", authController.createUser);

router.get("/verify-email", authController.setUserAsVerified);

// passport.authenticate is inside the controller
// for error handling purpose
router.post("/login/local", authController.loginUser);

/*  ______________
 *   GITHUB OAUTH
 *  ______________
 */

router.get(
  "/login/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  authController.loginUser
);
router.get(
  "/github/callback",
  passport.authenticate("github"),
  authController.loginUser
);

/*  ______________
 *   GOOGLE OAUTH
 *  ______________
 */

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// router.get("/google/callback", passport.authenticate("google"), (req, res) => {
//   return res.status(200).json({ user: req.user });
// });
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${config.CLIENT_DOMAIN}/registration`,
  })
);

router.get("/google/success", (req, res) => {
  res.status(200).json({ user: req.user });
});

/*  ________
 *   Logout
 *  ________
 */

router.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: `Something went wrong while loging you out: ${err}` });
    }
    return res
      .status(205)
      .clearCookie("connect.sid", { path: "/" })
      .json({ message: "logout" });
  });
});

export default router;
