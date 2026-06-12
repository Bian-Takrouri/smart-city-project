# MongoDB Database Structure

## Citizens
- citizenId (String, PK)
- name (String)
- email (String, unique, login)
- phone (String)
- district (String)
- preferredServices (Array)

## Requests
- requestId (String, PK)
- citizenId (FK → Citizens)
- issueType (String)
- description (String)
- status (Pending / In Progress / Resolved)
- priority (High / Medium / Low)
- departmentId (FK → Departments)
- areaId (FK → Areas)
- createdAt (String)

## Departments
- departmentId (String, PK)
- name (String)
- manager (String)
- email (String)

## Areas
- areaId (String, PK)
- name (String)
- population (Number)
