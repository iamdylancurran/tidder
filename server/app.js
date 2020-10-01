require('dotenv').config();
const cookieSession = require('cookie-session');
const session = require('express-session');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Database
require('./config/database');

// Passport / Authentication
const passport = require('passport');
const passportSetup = require('./config/passport');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    secret: process.env.COOKIE_KEY,
    maxAge: 24 * 60 * 60 * 100,
  }),
);

// Initialize passport
app.use(passport.initialize());
// Deserialize cookies from the browser
app.use(passport.session());

app.use(
  cors({
    origin: 'http://192.168.0.28:3000/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);

const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: 'User has not been authenticated.',
    });
  } else {
    next();
  }
};

app.get('/api', authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: 'User is authenticated.',
    user: req.user,
    cookies: req.cookies,
  });
});

app.use('/api/auth', authRouter);
app.use('/api/home', homeRouter);

app.listen(5000, () => {
  console.log('API listening on port 5000.');
});
