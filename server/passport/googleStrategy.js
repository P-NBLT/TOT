import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { config } from "../config/index.js";

function initialize(passport, User) {
  const clientID = config.GOOGLE_CLIENT_ID;
  const clientSecret = config.GOOGLE_CLIENT_SECRET;
  const callbackURL = config.GOOGLE_CALLBACK_URI;

  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        const newUser = await User.createOrFindOauth({
          id: profile.id,
          provider: "Google",
          email: profile.email,
          accessToken,
          refreshToken,
        });

        if (newUser.success === false || undefined) done(newUser.errMessage);
        done(null, newUser);
      }
    )
  );
}

export default initialize;
