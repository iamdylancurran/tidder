const router = require('express').Router();
const passport = require('passport');
const crypto = require('crypto');

const { CLIENT_HOME_PAGE_URL } = process.env;

const clientId = '9OdUSC8qPZSiDQ';
const clientSecret = '8tsOUNJQHouvUQ3v1fnvSUNPqOE';
const redirectUri = 'http://localhost:3000/callback';
const redditApi = 'https://www.reddit.com/api/v1';
const redditOauthApi = 'https://oauth.reddit.com';

// Successful login
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'User has successfully authenticated.',
      user: req.user,
      cookies: req.cookies,
    });
  }
});

// Login failed, send a failed message
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'User has failed to authenticate.',
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get('/', (req, res, next) => {
  req.session.state = crypto.randomBytes(32).toString('hex');
  passport.authenticate('reddit', {
    state: req.session.state,
    duration: 'permanent',
  })(req, res, next);
});

router.get('/redirect', (req, res, next) => {
  if (req.query.state === req.session.state) {
    passport.authenticate('reddit', (err, user, info) => {
      if (err) {
        return res.redirect('/api/auth/login/failed');
      }

      if (!user) {
        return res.redirect('/api/auth/login/failed');
      }

      req.login(user, (e) => {
        if (e) {
          return next(e);
        }

        req.session.accessToken = info.accessToken;
        req.session.refreshToken = info.refreshToken;

        return res.redirect(CLIENT_HOME_PAGE_URL);
      });
    })(req, res, next);
  } else {
    next(new Error(403));
  }
});

module.exports = router;
