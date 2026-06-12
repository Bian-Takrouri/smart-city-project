Smart City Neo4j Project

this project uses Neo4j (Graph Database) and Cypher Query Language to model city maintenance operations.
It represents relationships between citizens, service requests, areas, and municipal departments to enable efficient analysis of city issues.

🚀 Features
Modeling city data using graph structure.
Connecting citizens with their reported issues.
Linking requests to geographic areas.
Assigning departments to handle specific requests.
Performing graph-based analytics using traversal queries.

📂 Graph Database Components
🟢 Nodes
Citizen
Request (ServiceRequest)
Area
Department
🔵 Relationships
Citizen → REPORTED → Request
Request → LOCATED_IN → Area
Department → HANDLES → Request
Citizen → LIVES_IN → Area


🛠 How to Run (Neo4j)
Open Neo4j Desktop.
Start the database instance.
Run cypher_queries.cypher to create nodes and relationships.
Execute queries to explore and analyze the graph.

📊 Key Queries
🔹 View Full Graph
MATCH (n)-[r]->(m)
RETURN n, r, m;
🔹 Display All Nodes
MATCH (n)
RETURN n;
🔹 Most Active Area (Analytics)
MATCH (r:Request)-[:LOCATED_IN]->(a:Area)
RETURN a.name, COUNT(r) AS reports
ORDER BY reports DESC;

🧠 Purpose

This graph database demonstrates:
Relationship-based data modeling
Real-world smart city use cases
Graph traversal and analytics
Efficient handling of connected data