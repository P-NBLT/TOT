import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import User from "../models/User.js";

const store = new session.MemoryStore();

export function initializePassport(app) {
  try {
    app.use(
      session({
        secret: "some secret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
        store,
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
      new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async function verify(email, password, done) {
          const user = await User.findUserLocalLogin(email);
          console.log(user);
          if (user.success === false) return done(user.errorMessage);
          if (!user) done(null, false);
          if (password === user.password) done(null, user);
          //need bcrypt to check hashed password + handle result
        }
      )
    );
  } catch (e) {
    console.log("ERROR PASSPORT at initialization", e);
  }
}

export function serializePassport() {
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, {
        id: user.id,
        username: user.username,
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}
