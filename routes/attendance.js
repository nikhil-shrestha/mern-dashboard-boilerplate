const express = require('express');

const {
  getAttendance,
  createAttendance
} = require('../controllers/attendance');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getAttendance)
  .post(protect, authorize('user', 'admin'), createAttendance);

module.exports = router;
