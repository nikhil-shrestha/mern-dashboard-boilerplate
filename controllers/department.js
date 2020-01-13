const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const Company = require('../models/Company');
const Department = require('../models/Department');

// @desc    Get all department
// @route   GET /api/v1/department
// @route   GET /api/v1/company/:companyId/department
// @access  Public
exports.getDepartments = asyncHandler(async (req, res, next) => {
  if (req.params.companyId) {
    const department = await Department.find({ company: req.params.companyId });

    return res.status(200).json({
      success: true,
      count: department.length,
      data: department
    });
  }

  res.status(200).json(res.advancedResults);
});

// @desc    Add Department
// @route   POST /api/v1/company/:companyId/department
// @access  Private
exports.addDepartment = asyncHandler(async (req, res, next) => {
  req.body.company = req.params.companyId;
  req.body.user = req.user.id;

  const company = await Company.findById(req.params.companyId);

  if (!company) {
    return next(
      new ErrorResponse(
        `company not found with id of ${req.params.companyId}`,
        404
      )
    );
  }

  const department = await Department.create(req.body);

  res.status(201).json({
    success: true,
    data: department
  });
});

// @desc    Update Department
// @route   PUT /api/v1/department/:id
// @access  Private
exports.updateDepartment = asyncHandler(async (req, res, next) => {
  let department = await Department.findById(req.params.id);

  if (!department) {
    return next(
      new ErrorResponse(`Department not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure Department belongs to user or user is admin
  if (department.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this Department`,
        401
      )
    );
  }

  department = await Department.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: Department
  });
});

// @desc    Delete course
// @route   DELETE /api/v1/reivews/:id
// @access  Private
exports.deleteDepartment = asyncHandler(async (req, res, next) => {
  const department = await Department.findById(req.params.id);
  if (!department) {
    return next(
      new ErrorResponse(`Department not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure user is company owner
  if (department.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this Department`,
        401
      )
    );
  }

  department.remove();
  res
    .status(201)
    .json({ success: true, data: {}, message: 'Department Deleted!' });
});
