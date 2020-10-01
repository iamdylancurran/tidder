const router = require('express').Router();
const Reddit = require('../config/snoowrap');

// Get user's home page
router.get('/hot', async (req, res, next) => {
  try {
    const r = Reddit(req.get('User-Agent'), req.session.refreshToken);

    const items = await r.getHot('webdev', { limit: 10 });

    return res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
