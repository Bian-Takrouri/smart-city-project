// =====================
// CITIZENS
// =====================
CREATE (:Citizen {citizenId:"C101", name:"Lina"});
CREATE (:Citizen {citizenId:"C102", name:"Omar"});
CREATE (:Citizen {citizenId:"C103", name:"Sara"});
CREATE (:Citizen {citizenId:"C104", name:"Ali"});
CREATE (:Citizen {citizenId:"C105", name:"Noor"});

// =====================
// AREAS
// =====================
CREATE (:Area {areaId:"A01", name:"Downtown"});
CREATE (:Area {areaId:"A02", name:"City Center"});
CREATE (:Area {areaId:"A03", name:"North Area"});
CREATE (:Area {areaId:"A04", name:"West Area"});

// =====================
// DEPARTMENTS
// =====================
CREATE (:Department {departmentId:"D01", name:"Lighting"});
CREATE (:Department {departmentId:"D02", name:"Waste Management"});
CREATE (:Department {departmentId:"D03", name:"Traffic"});

// =====================
// REQUESTS
// =====================
CREATE (:Request {requestId:"R501", issueType:"Lighting", status:"Pending"});
CREATE (:Request {requestId:"R502", issueType:"Waste", status:"In Progress"});
CREATE (:Request {requestId:"R503", issueType:"Traffic", status:"Pending"});
CREATE (:Request {requestId:"R504", issueType:"Road Damage", status:"Pending"});
CREATE (:Request {requestId:"R505", issueType:"Lighting", status:"Resolved"});
CREATE (:Request {requestId:"R506", issueType:"Waste", status:"Pending"});


// =====================
// RELATIONSHIPS
// =====================

// Citizen -> Request
MATCH (c:Citizen {citizenId:"C101"}), (r:Request {requestId:"R501"})
CREATE (c)-[:REPORTED]->(r);

MATCH (c:Citizen {citizenId:"C102"}), (r:Request {requestId:"R502"})
CREATE (c)-[:REPORTED]->(r);

MATCH (c:Citizen {citizenId:"C103"}), (r:Request {requestId:"R503"})
CREATE (c)-[:REPORTED]->(r);

MATCH (c:Citizen {citizenId:"C104"}), (r:Request {requestId:"R504"})
CREATE (c)-[:REPORTED]->(r);

MATCH (c:Citizen {citizenId:"C105"}), (r:Request {requestId:"R505"})
CREATE (c)-[:REPORTED]->(r);


// Request -> Area
MATCH (r:Request {requestId:"R501"}), (a:Area {areaId:"A01"})
CREATE (r)-[:LOCATED_IN]->(a);

MATCH (r:Request {requestId:"R502"}), (a:Area {areaId:"A02"})
CREATE (r)-[:LOCATED_IN]->(a);

MATCH (r:Request {requestId:"R503"}), (a:Area {areaId:"A03"})
CREATE (r)-[:LOCATED_IN]->(a);

MATCH (r:Request {requestId:"R504"}), (a:Area {areaId:"A01"})
CREATE (r)-[:LOCATED_IN]->(a);

MATCH (r:Request {requestId:"R505"}), (a:Area {areaId:"A04"})
CREATE (r)-[:LOCATED_IN]->(a);


// Department -> Request
MATCH (d:Department {departmentId:"D01"}), (r:Request {requestId:"R501"})
CREATE (d)-[:HANDLES]->(r);

MATCH (d:Department {departmentId:"D02"}), (r:Request {requestId:"R502"})
CREATE (d)-[:HANDLES]->(r);

MATCH (d:Department {departmentId:"D03"}), (r:Request {requestId:"R503"})
CREATE (d)-[:HANDLES]->(r);

MATCH (d:Department {departmentId:"D01"}), (r:Request {requestId:"R504"})
CREATE (d)-[:HANDLES]->(r);

MATCH (d:Department {departmentId:"D01"}), (r:Request {requestId:"R505"})
CREATE (d)-[:HANDLES]->(r);

MATCH (d:Department {departmentId:"D02"}), (r:Request {requestId:"R506"})
CREATE (d)-[:HANDLES]->(r);


// Citizen -> Area
MATCH (c:Citizen {citizenId:"C101"}), (a:Area {areaId:"A01"})
CREATE (c)-[:LIVES_IN]->(a);

MATCH (c:Citizen {citizenId:"C102"}), (a:Area {areaId:"A02"})
CREATE (c)-[:LIVES_IN]->(a);

MATCH (c:Citizen {citizenId:"C103"}), (a:Area {areaId:"A03"})
CREATE (c)-[:LIVES_IN]->(a);

MATCH (c:Citizen {citizenId:"C104"}), (a:Area {areaId:"A01"})
CREATE (c)-[:LIVES_IN]->(a);

MATCH (c:Citizen {citizenId:"C105"}), (a:Area {areaId:"A04"})
CREATE (c)-[:LIVES_IN]->(a);
