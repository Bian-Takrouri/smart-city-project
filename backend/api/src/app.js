const express = require('express');
const cors = require('cors');
const app = express();

// CORS configuration - يسمح لأي مصدر بالاتصال
// بيسمح لل frontend connect with backend
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// convert from JSON to javascript
app.use(express.json());

// بيتاكد اذا ال backend شغال فبروح على ال port 5000 وهيك بتاكد اذا ال server شغال او لا 
app.get('/', (req, res) => {
  res.send('Smart City API Running 🚀');
});

// مسارات API (Routes)
app.use('/api/citizens', require('./routes/citizenRoutes')); // ex : GET /api/citizens
app.use('/api/requests', require('./routes/requestRoutes')); // ex : POST /api/requests
app.use('/api/analytics', require('./routes/analyticsRoutes')); // ex : GET /api/analytics/most-common-issues
app.use('/api/auth', require('./routes/authRoutes')); // ex : POST /api/auth/login --> هون بتكون لانشاء الجلسات و تسجيل الدخول

module.exports = app; // يربط app.js مع server.js