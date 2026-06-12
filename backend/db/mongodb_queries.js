// INDEXES
db.Citizen.createIndex({ email: 1 }, { unique: true })
db.Citizen.createIndex({ citizenId: 1 })
db.Citizen.createIndex({ district: 1 })

db["Service Request"].createIndex({ citizenId: 1 })
db["Service Request"].createIndex({ departmentId: 1 })
db["Service Request"].createIndex({ areaId: 1 })
db["Service Request"].createIndex({ status: 1 })
db["Service Request"].createIndex({ issueType: 1 })
db["Service Request"].createIndex({ createdAt: -1 })

db.Department.createIndex({ departmentId: 1 })
db.Department.createIndex({ name: 1 })

db.Area.createIndex({ areaId: 1 })
db.Area.createIndex({ name: 1 })
// QUERIES
db["Service Request"].find({ status: "Pending" })

db["Service Request"].find({ citizenId: "C101" })

// AGGREGATIONS
db["Service Request"].aggregate([
  { $group: { _id: "$departmentId", total: { $sum: 1 } } }
])

db["Service Request"].aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])
db["Service Request"].aggregate([
  { $group: { _id: "$areaId", count: { $sum: 1 } } }
])
db["Service Request"].aggregate([
  { $group: { _id: "$issueType", count: { $sum: 1 } } }
])
