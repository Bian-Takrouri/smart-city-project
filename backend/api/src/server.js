require('dotenv').config(); // بروح على ال .env وبقرأ المتغيرات الي فيها 

const app = require('./app');
const connectMongo = require('./config/mongo');
const redisClient = require('./config/redis');
const neo4jDriver = require('./config/neo4j');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectMongo(); // config/mongo.js بروح هون وفي هذا الملف في فحص الاتصال

// Redis connection events
// اختبار الاتصال ل ريدس
redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.on('error', (err) => {
  console.log('❌ Redis error:', err.message);
});

// Test Neo4j connection
async function testNeo4j() {
  try {
    const session = neo4jDriver.session();
    await session.run('RETURN 1');
    console.log('✅ Neo4j connected');
    await session.close();
  } catch (err) {
    console.log('❌ Neo4j error:', err.message);
  }
}
testNeo4j();

// Start server
//شو بيعمل؟ يشغل خادم Express ويبدأ في الاستماع للطلبات
// يعني ال framework run server 
// بدون السطر الي تحت ما رح يشتغل ال api
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});