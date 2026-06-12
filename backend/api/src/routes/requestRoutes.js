const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus,
  deleteRequest
} = require('../controllers/requestController');

router.post('/', createRequest);
router.get('/', getRequests);
router.get('/:id', getRequestById);
router.put('/:id', updateRequestStatus);
router.delete('/:id', deleteRequest);

module.exports = router;