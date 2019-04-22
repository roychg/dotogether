/**
 * @TODO add local strategy
 */

const passport = require("passport");
const GoogleSt = require("passport-google-oauth20").Strategy;
const User = require("model/User");

//Serialize, deserialize
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

/**
 * Passport Google login
 */
passport.use(
  "google",
  new GoogleSt(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALL_BACK,
      userProfileURL: process.env.GOOGLE_SCOPE_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      const userInfo = {
        email: profile.emails[0].value,
        username: profile.displayName.split(" ")[0] || profile.name.givenName,
        avatar: profile.photos[0].value
      };
      try {
        let user = await User.findByEmail(userInfo.email);
        if (!user) {
          user = await User.createUser(userInfo);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;