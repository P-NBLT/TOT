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
        if (!user) done(null, false);

        const match = await bcrypt.compare(password, user.password);
        if (!match) done(null, false);

        const profile = await Profile.findProfileByUserID(user.id);

        if (profile) {
          user.username = profile.username;
          return done(null, user);
        } else return done(null, user);
      }
    )
  );
}

export default initialize;
