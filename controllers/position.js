const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const Company = require('../models/Company');
const Position = require('../models/Position');

// @desc    Get all Position
// @route   GET /api/v1/Position
// @route   GET /api/v1/company/:companyId/Position
// @access  Public
exports.getPositions = asyncHandler(async (req, res, next) => {
  if (req.params.companyId) {
    const position = await Position.find({ company: req.params.companyId });

    return res.status(200).json({
      success: true,
      count: position.length,
      data: position
    });
  }

  res.status(200).json(res.advancedResults);
});

// @desc    Add Position
// @route   POST /api/v1/company/:companyId/Position
// @access  Private
exports.addPosition = asyncHandler(async (req, res, next) => {
  req.body.company = req.params.companyId;

  const company = await Company.findById(req.params.companyId);

  if (!company) {
    return next(
      new ErrorResponse(
        `company not found with id of ${req.params.companyId}`,
        404
      )
    );
  }

  const position = await Position.create(req.body);

  res.status(201).json({
    success: true,
    data: position
  });
});

// @desc    Update Position
// @route   PUT /api/v1/Position/:id
// @access  Private
exports.updatePosition = asyncHandler(async (req, res, next) => {
  let position = await Position.findById(req.params.id);

  if (!position) {
    return next(
      new ErrorResponse(`Position not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure Position belongs to user or user is admin
  if (req.user.role !== 'company_admin' && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User not authorized to perform this action!`, 401)
    );
  }

  position = await Position.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: position
  });
});

// @desc    Delete course
// @route   DELETE /api/v1/reivews/:id
// @access  Private
exports.deletePosition = asyncHandler(async (req, res, next) => {
  const position = await Position.findById(req.params.id);
  if (!position) {
    return next(
      new ErrorResponse(`Position not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure Position belongs to user or user is admin
  if (req.user.role !== 'company_admin' && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User not authorized to perform this action!`, 401)
    );
  }

  position.remove();
  res
    .status(201)
    .json({ success: true, data: {}, message: 'Position Deleted!' });
});
