const express = require('express');
const router = express.Router();
const {
  createCitizen,
  getCitizens,
  getCitizenById,
  updateCitizen,
  deleteCitizen
} = require('../controllers/citizenController');

router.post('/', createCitizen);
router.get('/', getCitizens);
router.get('/:id', getCitizenById);
router.put('/:id', updateCitizen);
router.delete('/:id', deleteCitizen);

// إنشاء جلسة في Redis
router.post('/session/:citizenId', async (req, res) => {
    const { citizenId } = req.params;
    try {
        const redisClient = require('../config/redis');
        await redisClient.set(`session:${citizenId}`, 'active', { EX: 3600 });
        res.json({ success: true, message: 'Session created' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;