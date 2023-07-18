import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import Profile from "../models/Profile.js";

function initialize(passport, User) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async function verify(email, password, done) {
        const user = await User.findUserByEmail(email);

        if (user.success === false) return done(user.errorMessage);
        if (!user) {
          return done(null, false, {
            type: "email/pasword",
            message: "Invalid email or password",
          });
        }
        if (!user.is_verified) {
          return done(null, false, {
            type: "unverified",
            message: "user email not verified. please verify yout email.",
          });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match)
          return done(null, false, {
            type: "email/pasword",
            message: "Invalid email or password",
          });

        const profile = await Profile.findProfileByUserID(user.id, [
          "username",
        ]);

        if (profile) {
          user.username = profile.username;
          return done(null, user);
        } else return done(null, user);
      }
    )
  );
}

export default initialize;
