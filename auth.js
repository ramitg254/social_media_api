import { findUser } from "./controllers/findUser.js";
import { addUser } from "./controllers/addUser.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await findUser(profile);
        if (user) {
          return cb(null, user);
        } else {
          const addedUser = await addUser(profile);
          return cb(null, addedUser);
        }
      } catch (err) {
        return cb(err,null);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

export default passport;
