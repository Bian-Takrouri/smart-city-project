**Data Structures**
Sessions: session:{citizenId}

Analytics: area_stats:{areaId}

**Features**
FR10: Active session management.

FR9: High-traffic area caching.

NFR2: Latency reduction (Fast Response).

**Setup**
Download Redis: Redis-x64-3.0.504.msi

Install: Run the MSI file and install it in D:\redis.

Run Server: Execute redis-server.exe from the installation folder.

Dependencies: Run pip install redis.

Execution: Run cache_manager.py to start the service.