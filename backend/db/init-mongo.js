db = db.getSiblingDB('smartcity');

// تنفيذ ملف الاستعلامات والفهارس
load("/data/scripts/mongodb_queries.js");

print(" MongoDB initialized with external files");