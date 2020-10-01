const passport = require('passport');
const RedditStrategy = require('passport-reddit').Strategy;

const {
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET,
  REDDIT_REDIRECT_URI,
} = process.env;
const User = require('../models/User');

passport.use(
  new RedditStrategy(
    {
      clientID: REDDIT_CLIENT_ID,
      clientSecret: REDDIT_CLIENT_SECRET,
      callbackURL: REDDIT_REDIRECT_URI,
      scope: ['identity', 'mysubreddits', 'read', 'subscribe'],
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOneAndUpdate(
        { redditId: profile.id },
        { name: profile.name, redditId: profile.id },
        { upsert: true, new: true, runValidators: true },
        (err, user) => done(err, user, { accessToken, refreshToken }),
      );
    },
  ),
);

// Serialize user.id to go in the cookie session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user.id to find the user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch(() => {
      done(new Error('Failed to deserialize user.'));
    });
});
