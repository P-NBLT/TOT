import { Strategy as githubStrategy } from "passport-github2";
import { config } from "../config/index.js";

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
        const newUser = await User.createOrFindOauth({
          id: profile._json.id,
          email: profile._json.email,
          provider: "Github",
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
