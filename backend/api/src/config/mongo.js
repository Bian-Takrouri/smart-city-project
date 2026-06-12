const mongoose = require("mongoose");


// بيحاول يتصل مع mongodb من خلال ال URL الموجود في ال .env ((MONGO_URL))
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Mongo error:", err);
  }
};

module.exports = connectMongo; //يُصدر الدالة ليتم استخدامها في server.js