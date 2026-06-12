const Citizen = require('../models/Citizen');
const neo4jDriver = require('../config/neo4j');

// إنشاء مواطن جديد (MongoDB + Neo4j)
const createCitizen = async (req, res) => {
  const session = neo4jDriver.session();
  try {
    // 1. حفظ المواطن في MongoDB
    const citizen = await Citizen.create(req.body);
    console.log(`✅ Citizen saved to MongoDB: ${citizen.citizenId}`);
    
    // 2. إنشاء Citizen node في Neo4j
    try {
      await session.run(
        `CREATE (c:Citizen {citizenId: $citizenId, name: $name, email: $email, district: $district})`,
        {
          citizenId: req.body.citizenId,
          name: req.body.name || 'Unknown',
          email: req.body.email || 'Unknown',
          district: req.body.district || 'Unknown'
        }
      );
      console.log(`✅ Citizen created in Neo4j: ${req.body.citizenId}`);
    } catch (neoError) {
      console.error('❌ Neo4j error:', neoError.message);
    }
    
    // 3. إذا تم تحديد منطقة، أنشئ علاقة LIVES_IN
    if (req.body.areaId) {
      try {
        await session.run(
          `MATCH (c:Citizen {citizenId: $citizenId})
           MATCH (a:Area {areaId: $areaId})
           MERGE (c)-[:LIVES_IN]->(a)`,
          { citizenId: req.body.citizenId, areaId: req.body.areaId }
        );
        console.log(`✅ LIVES_IN relationship created for ${req.body.citizenId}`);
      } catch (relError) {
        console.error('❌ LIVES_IN error:', relError.message);
      }
    }
    
    await session.close();
    res.status(201).json({ success: true, data: citizen });
  } catch (err) {
    console.error('❌ Create citizen error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (session) await session.close();
  }
};

// جلب جميع المواطنين
const getCitizens = async (req, res) => {
  try {
    const citizens = await Citizen.find();
    res.json({ success: true, data: citizens });
  } catch (err) {
    console.error('Get citizens error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// جلب مواطن بواسطة ID
const getCitizenById = async (req, res) => {
  try {
    const citizen = await Citizen.findOne({ citizenId: req.params.id });
    if (!citizen) {
      return res.status(404).json({ success: false, error: 'Citizen not found' });
    }
    res.json({ success: true, data: citizen });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// تحديث مواطن
const updateCitizen = async (req, res) => {
  const session = neo4jDriver.session();
  try {
    const citizen = await Citizen.findOneAndUpdate(
      { citizenId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!citizen) {
      return res.status(404).json({ success: false, error: 'Citizen not found' });
    }
    
    // تحديث Neo4j
    await session.run(
      `MATCH (c:Citizen {citizenId: $citizenId})
       SET c.name = $name, c.email = $email, c.district = $district`,
      {
        citizenId: req.params.id,
        name: req.body.name || 'Unknown',
        email: req.body.email || 'Unknown',
        district: req.body.district || 'Unknown'
      }
    );
    
    await session.close();
    res.json({ success: true, data: citizen });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (session) await session.close();
  }
};

// حذف مواطن (من MongoDB و Neo4j)
const deleteCitizen = async (req, res) => {
  const session = neo4jDriver.session();
  try {
    // حذف من MongoDB
    const citizen = await Citizen.findOneAndDelete({ citizenId: req.params.id });
    if (!citizen) {
      return res.status(404).json({ success: false, error: 'Citizen not found' });
    }
    
    // حذف من Neo4j وجميع علاقاته
    await session.run(
      `MATCH (c:Citizen {citizenId: $citizenId}) DETACH DELETE c`,
      { citizenId: req.params.id }
    );
    
    await session.close();
    res.json({ success: true, message: 'Citizen deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (session) await session.close();
  }
};

module.exports = {
  createCitizen,
  getCitizens,
  getCitizenById,
  updateCitizen,
  deleteCitizen
};