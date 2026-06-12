Nodes:
Citizen
ServiceRequest
Department
Area

Relationships:
Citizen -[:REPORTED]-> ServiceRequest
ServiceRequest -[:LOCATED_IN]-> Area
Department -[:HANDLES]-> ServiceRequest
Citizen -[:LIVES_IN]-> Area