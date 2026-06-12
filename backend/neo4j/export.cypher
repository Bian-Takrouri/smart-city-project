// Export Graph (if APOC installed)
CALL apoc.export.graphml.all("smartcity.graphml", {});

// Export CSV Backup
CALL apoc.export.csv.all("smartcity.csv", {});

// Optional: full backup command in Neo4j Desktop
// Use "Dump Database" from Neo4j Desktop UI



// (بدون APOCا)
// Backup / Export Instructions
// Use Neo4j Desktop:
// Database → Export → Dump or CSV