const ServiceRequest = require('../models/ServiceRequest');
const neo4jDriver = require('../config/neo4j');
const redisClient = require('../config/redis');

// Most Common Issues (MongoDB)
const getMostCommonIssues = async (req, res) => {
  try {
    const result = await ServiceRequest.aggregate([
      { $group: { _id: '$issueType', total: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Busiest Areas (Neo4j with Redis Cache)
const getBusiestAreas = async (req, res) => {
  const cacheKey = 'busiest_areas_cache';
  
  try {
    // 1. Check Redis cache first
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log('✅ Busiest areas from Redis cache');
      return res.json(JSON.parse(cached));
    }
    
    console.log('❌ Busiest areas from Neo4j (cache miss)');
    
    // 2. Query Neo4j
    const session = neo4jDriver.session();
    const result = await session.run(
      `MATCH (r:Request)-[:LOCATED_IN]->(a:Area)
       WHERE a.name IS NOT NULL AND a.name <> ''
       RETURN a.name AS area, COUNT(r) AS reports
       ORDER BY reports DESC
       LIMIT 10`
    );
    await session.close();
    
    const areas = result.records.map(record => ({
      area: record.get('area'),
      reports: record.get('reports').toNumber()
    }));
    
    // 3. Store in Redis for 10 minutes
    await redisClient.setEx(cacheKey, 600, JSON.stringify(areas));
    
    res.json({ success: true, data: areas });
  } catch (err) {
    console.error('Neo4j busiest areas error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Request Statistics (MongoDB)
const getRequestStats = async (req, res) => {
  try {
    const result = await ServiceRequest.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getMostCommonIssues,
  getBusiestAreas,
  getRequestStats
};