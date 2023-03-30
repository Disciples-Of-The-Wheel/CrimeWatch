const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
// require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      clientID: '478202609279-iiq2abjnnpe32jk0npoai4c4b3ofatql.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "/auth/google/callback",
      scope: ['profile'],
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
