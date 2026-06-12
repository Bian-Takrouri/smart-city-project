const express = require('express');
const router = express.Router();
const Citizen = require('../models/Citizen');
const redisClient = require('../config/redis');

router.post('/login', async (req, res) => {
    try {
        const { email, citizenId } = req.body;

        const user = await Citizen.findOne({ email: email.trim(), citizenId: citizenId.trim() });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        await redisClient.set(`session:${citizenId}`, 'active', { EX: 3600 });

        res.json({ success: true, message: 'Login successful', user: { citizenId: user.citizenId, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;