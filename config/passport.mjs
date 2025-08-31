import config from "../config/default.mjs";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// --------------- Налаштування локальної стратегії ------------------
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.googleClientId,
      clientSecret: config.google.googleClientSecret,
      callbackURL: config.google.callbackURL,
    },
    function (accessToken, refreshToken, profile, cb) {
      // Просто повертаємо profile як user
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
