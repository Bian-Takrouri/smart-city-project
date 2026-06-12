console.log("✅ cache.js loaded successfully");
const redisClient = require('../config/redis');

const cache = (keyPrefix, expiry = 60) => {
  return async (req, res, next) => {
    const key = `${keyPrefix}:${req.originalUrl}`;
    
    try {
      const cached = await redisClient.get(key);
      
      if (cached) {
        console.log(`✅ Cache hit for ${key}`);
        return res.json(JSON.parse(cached));
      }
      
      console.log(`❌ Cache miss for ${key}`);
      
      // Save the original json method
      res.sendResponse = res.json;
      
      // Override json method to cache the response
      res.json = (body) => {
        redisClient.setEx(key, expiry, JSON.stringify(body));
        res.sendResponse(body);
      };
      
      next();
    } catch (err) {
      console.error('Cache error:', err);
      next();
    }
  };
};

module.exports = cache;