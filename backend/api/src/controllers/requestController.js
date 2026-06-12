const ServiceRequest = require('../models/ServiceRequest');
const neo4jDriver = require('../config/neo4j');

// إنشاء طلب جديد (MongoDB + Neo4j)
const createRequest = async (req, res) => {
  const session = neo4jDriver.session();
  try {
    const request = await ServiceRequest.create(req.body);
    
    await session.run(
      `MERGE (c:Citizen {citizenId: $citizenId})
       MERGE (a:Area {areaId: $areaId})
       CREATE (r:Request {requestId: $requestId, issueType: $issueType, status: $status, priority: $priority})
       CREATE (c)-[:REPORTED]->(r)
       CREATE (r)-[:LOCATED_IN]->(a)`,
      {
        citizenId: req.body.citizenId,
        areaId: req.body.areaId || 'A01',
        requestId: req.body.requestId,
        issueType: req.body.issueType,
        status: req.body.status || 'Pending',
        priority: req.body.priority || 'Medium'
      }
    );
    
    await session.close();
    res.status(201).json({ success: true, data: request });
  } catch (err) {
    console.error('Create request error:', err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (session) await session.close();
  }
};

// جلب جميع الطلبات
const getRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find();
    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// جلب طلب بواسطة ID
const getRequestById = async (req, res) => {
  try {
    const request = await ServiceRequest.findOne({ requestId: req.params.id });
    if (!request) {
      return res.status(404).json({ success: false, error: 'Request not found' });
    }
    res.json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// تحديث حالة الطلب
const updateRequestStatus = async (req, res) => {
  const session = neo4jDriver.session();
  try {
    const request = await ServiceRequest.findOneAndUpdate(
      { requestId: req.params.id },
      { status: req.body.status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ success: false, error: 'Request not found' });
    }
    
    await session.run(
      `MATCH (r:Request {requestId: $requestId})
       SET r.status = $status`,
      { requestId: req.params.id, status: req.body.status }
    );
    
    await session.close();
    res.json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (session) await session.close();
  }
};

// حذف طلب (من MongoDB و Neo4j)
const deleteRequest = async (req, res) => {
  const session = neo4jDriver.session();
  try {
    // حذف من MongoDB
    const request = await ServiceRequest.findOneAndDelete({ requestId: req.params.id });
    if (!request) {
      return res.status(404).json({ success: false, error: 'Request not found' });
    }
    
    // حذف من Neo4j وجميع علاقاته
    await session.run(
      `MATCH (r:Request {requestId: $requestId}) DETACH DELETE r`,
      { requestId: req.params.id }
    );
    
    await session.close();
    res.json({ success: true, message: 'Request deleted from MongoDB and Neo4j' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (session) await session.close();
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus,
  deleteRequest
};