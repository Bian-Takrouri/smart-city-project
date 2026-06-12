# 🏙️ Smart City Service Management Platform

**Multi‑model NoSQL platform integrating MongoDB, Neo4j, and Redis for municipal service request management.**

---

## 📌 Overview

A full‑stack platform that allows citizens to submit city service requests (waste, traffic, street lighting, etc.), track their status, and view real‑time analytics.  
The system integrates **three database engines**:

- **MongoDB** – stores citizens, requests, departments, areas  
- **Neo4j** – manages graph relationships (`REPORTED`, `LOCATED_IN`, `LIVES_IN`, `HANDLES`)  
- **Redis** – caches user sessions and analytics results for high performance  

All services are containerized with **Docker Compose** and communicate through a **Node.js + Express.js** backend API.

---

## 🚀 Features

- Citizen registration & login (session caching in Redis)  
- Submit and track service requests  
- Department staff can update request status  
- Analytics dashboard:  
  - Most common issues (MongoDB aggregation)  
  - Busiest areas (Neo4j Cypher queries)  
  - Request statistics by status  
- Full Docker containerization (5 services)  
- RESTful API with 19+ endpoints  

---

## 🛠️ Tech Stack

| Layer          | Technologies                                                                 |
|----------------|------------------------------------------------------------------------------|
| Frontend       | HTML5, Bootstrap 5, Vanilla JavaScript                                      |
| Backend        | Node.js, Express.js, REST API                                               |
| Databases      | MongoDB (document), Neo4j (graph), Redis (cache)                            |
| Container      | Docker, Docker Compose                                                      |

---

## 🧪 How to Run (for reviewers / team)

```bash
git clone <your-repo-url>
cd smart-city
docker-compose up -d --build


Then open:

Frontend: http://localhost:3000

Backend API: http://localhost:5000

Neo4j Browser: http://localhost:7474 (neo4j / password123)

⚠️ Make sure Docker Desktop is running before executing the commands.

📊 Example API Endpoints
Method	           Endpoint	                     Description
GET	   /api/citizens	                           List all citizens
POST	 /api/requests	                           Submit a service request
GET	   /api/analytics/most-common-issues	       Issue statistics
GET	   /api/analytics/busiest-areas	             Busiest areas (Neo4j)
POST  	/api/auth/login	                         Login & create Redis session


🧠 What This Project Demonstrates
-Multi‑model database integration (document + graph + cache)
-Real‑world smart city service workflow
-Distributed databases within Docker
-Performance tuning: indexes, caching (Redis), read‑through strategy
-Modern backend patterns (REST, MVC, environment‑based config)
-Awareness of NoSQL trade‑offs

👩‍💻 Authors
Bian Takrouri , Marwa Manasra , Shaden Imriziq , Ikram Bader , Jana Abu Shama

📄 License
This project was developed as a course project (NoSQL Databases / Smart City Platform).
For educational purposes only.

