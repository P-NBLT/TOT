import passport from "passport";
import session from "express-session";
import User from "../models/User.js";
import localStrategy from "./localStrategy.js";
import googleStrategy from "./googleStrategy.js";
import githubStrategy from "./githubStrategy.js";

const store = new session.MemoryStore();

export const sessionMiddleware = session({
  secret: "some secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 300000000,
    httpOnly: true,
  },
  store,
});

export const passportMiddleware = {
  initialize: passport.initialize(),
  session: passport.session(),
};

export function initializePassport(app) {
  try {
    app.use(sessionMiddleware);
    localStrategy(passport, User);
    googleStrategy(passport, User);
    githubStrategy(passport, User);
    app.use(passportMiddleware.initialize);
    app.use(passportMiddleware.session);
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
