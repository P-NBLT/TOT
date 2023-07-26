import passport from "passport";
import session from "express-session";
import User from "../models/User.js";
import localStrategy from "./localStrategy.js";
import googleStrategy from "./googleStrategy.js";
import githubStrategy from "./githubStrategy.js";

const store = new session.MemoryStore();

export function initializePassport(app) {
  try {
    app.use(
      session({
        secret: "some secret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 300000000 },
        store,
      })
    );
    localStrategy(passport, User);
    googleStrategy(passport, User);
    githubStrategy(passport, User);
    app.use(passport.initialize());
    app.use(passport.session());
  } catch (e) {
    console.log("ERROR PASSPORT at initialization", e);
  }
}

export function serializePassport() {
  passport.serializeUser(async function (user, cb) {
    process.nextTick(function () {
      return cb(null, {
        id: user.id,
        email: user.email,
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
