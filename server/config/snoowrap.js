const Snoowrap = require('snoowrap');

const { REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET } = process.env;

function Reddit(userAgent, refreshToken) {
  const r = new Snoowrap({
    clientId: REDDIT_CLIENT_ID,
    clientSecret: REDDIT_CLIENT_SECRET,
    userAgent,
    refreshToken,
  });

  return r;
}

module.exports = Reddit;
