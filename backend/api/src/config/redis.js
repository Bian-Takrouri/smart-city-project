const redis = require("redis"); // هاي عبارة عم مكتبة redis وهي بتسمح لي باني اعمل (SET, GET, KEYS, EXPIRE)

//  ينشئ عميلاً (client) للاتصال بـ Redis باستخدام الرابط من .env
const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.connect(); // يبدا الاتصال الفعلي ب redis

client.on("connect", () => {
  console.log("Redis connected");
});

module.exports = client; // تم تصديره ليستخدم في ملفات اخرى