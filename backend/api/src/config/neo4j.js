const neo4j = require('neo4j-driver');

// بنشئ driver بتواصل مع neo4j ......... الرابط هذا بكون داخل docker bolt://neo4j:7687
const driver = neo4j.driver(
  process.env.NEO4J_URL || 'bolt://neo4j:7687',
  neo4j.auth.basic('neo4j', 'password123'),
  {
    encrypted: 'ENCRYPTION_OFF'  // 🔴 هذا يمنع مشكلة التشفير
  }
);

async function testConnection() {
  const session = driver.session();
  try {
    await session.run('RETURN 1');
    console.log('✅ Neo4j connected');
  } catch (err) {
    console.log('❌ Neo4j error:', err.message);
  } finally {
    await session.close();
  }
}

testConnection();

module.exports = driver; // يُصدر ال(driver) ليتم استخدامه في ملفات أخرى