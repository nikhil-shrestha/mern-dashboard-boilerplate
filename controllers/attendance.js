const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const Attendance = require('../models/Attendance');

// @desc    Get all attendance
// @route   GET /api/v1/attendance
// @access  Public
exports.getAttendance = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: true, message: 'Get all attendance' });
});

// @desc    Create new attendance
// @route   POST /api/v1/attendance
// @access  Private
exports.createAttendance = asyncHandler(async (req, res, next) => {
  res.status(201).json({ success: true, message: 'Create new attendance' });
});
