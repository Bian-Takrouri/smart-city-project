const express = require('express');
const router = express.Router();
const cache = require('../middleware/cache');
const {
  getMostCommonIssues,
  getBusiestAreas,
  getRequestStats
} = require('../controllers/analyticsController');
const redisClient = require('../config/redis');

router.get('/most-common-issues', cache('analytics', 600), getMostCommonIssues);
router.get('/busiest-areas', cache('analytics', 600), getBusiestAreas);
router.get('/request-stats', cache('analytics', 600), getRequestStats);

// مسح Cache التحليلات
router.post('/cache/clear', async (req, res) => {
  try {
    const keys = await redisClient.keys('analytics:*');
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
    res.json({ success: true, message: 'Cache cleared' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;