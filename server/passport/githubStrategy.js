import { Strategy as githubStrategy } from "passport-github2";
import { config } from "../config/index.js";
import { getProfile } from "./helper.js";

function initialize(passport, User) {
  const clientID = config.GITHUB_CLIENT_ID;
  const clientSecret = config.GITHUB_CLIENT_SECRET;
  const callbackURL = config.GITHUB_CALLBACK_URI;

  passport.use(
    new githubStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
      },
      async function (accessToken, refreshToken, profile, done) {
        let user = await User.createOrFindOauth({
          id: profile._json.id,
          email: profile._json.email,
          provider: "Github",
          accessToken,
          refreshToken,
        });

        if (user.success === false || undefined) done(user.errMessage);
        user = { ...user, ...(await getProfile(user)) };
        done(null, user);
      }
    )
  );
}

export default initialize;
