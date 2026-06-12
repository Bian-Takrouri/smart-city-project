//Display All Nodes:
MATCH (n)
RETURN n;

//All Nodes and Relationships Query 
MATCH (n)-[r]->(m)
RETURN n, r, m

//1) Most Active Area
MATCH (r:Request)-[:LOCATED_IN]->(a:Area)
RETURN a.name AS Area, COUNT(r) AS reports
ORDER BY reports DESC;



//2) Most Active Citizen (Highest Number of Reports)
MATCH (c:Citizen)-[:REPORTED]->(r:Request)
RETURN c.name AS Citizen, COUNT(r) AS totalReports
ORDER BY totalReports DESC

//3) Most Active Department (Handles Most Requests)
MATCH (d:Department)-[:HANDLES]->(r:Request)
RETURN d.name AS Department, COUNT(r) AS handledRequests
ORDER BY handledRequests DESC;

//4) Downtown Requests Traversal (Full Path)
MATCH p = (d:Department)-[:HANDLES]->(r:Request)-[:LOCATED_IN]->(a:Area)
WHERE a.name = "Downtown"
RETURN p;

//5)traversal Query (Downtown Requests)
MATCH p = (c:Citizen)-[:REPORTED]->(r:Request)-[:LOCATED_IN]->(a:Area)
WHERE a.name = "Downtown"
RETURN p;


 //6) Full Graph Overview (System View)
MATCH p = (c:Citizen)-[:REPORTED]->(r:Request)
      -[:LOCATED_IN]->(a:Area),
      (d:Department)-[:HANDLES]->(r)
RETURN p;


