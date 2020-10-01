const router = require('express').Router();
const Reddit = require('../config/snoowrap');

// Get user's home page
router.get('/:category', async (req, res, next) => {
  try {
    const r = Reddit(req.get('User-Agent'), req.session.refreshToken);
    const { after, before } = req.query || '';
    let items;
    const config = { limit: 10, after, before };
    switch (req.params.category) {
      case 'hot':
        items = await r.getHot(null, config);
        break;
      case 'best':
        items = await r.getBest(config);
        break;
      case 'top':
        items = await r.getTop(null, config);
        break;
      case 'new':
        items = await r.getNew(null, config);
        break;
      case 'rising':
        items = await r.getRising(null, config);
        break;
      case 'controversial':
        items = await r.getControversial(null, config);
        break;
      default:
        items = await r.getHot(null, config);
        break;
    }
    return res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
