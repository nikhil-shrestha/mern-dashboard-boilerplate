const path = require('path');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const Company = require('../models/Company');

// @desc    Get all company
// @route   GET /api/v1/company
// @access  Public
exports.getCompanies = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get a single company
// @route   GET /api/v1/company/:id
// @access  Public
exports.getCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    return next(
      new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: company });
});

// @desc    Create new company
// @route   POST /api/v1/company/
// @access  Private
exports.createCompany = asyncHandler(async (req, res, next) => {
  // if the user is not an admin, they can only add one company
  if (req.user.role !== 'admin') {
    return next(new ErrorResponse(`User not authorized!`, 404));
  }

  const company = await Company.create(req.body);
  res.status(201).json({ success: true, data: company });
});

// @desc    Update company
// @route   PUT /api/v1/company/:id
// @access  Private
exports.updateCompany = asyncHandler(async (req, res, next) => {
  // if the user is not an admin, they can only add one company
  if (req.user.role !== 'admin' && req.user.role !== 'company_admin') {
    return next(new ErrorResponse(`User not authorized to access!`, 404));
  }
  let company = await Company.findById(req.params.id);
  if (!company) {
    return next(new ErrorResponse('Company not found!', 404));
  }

  company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(201).json({ success: true, data: company });
});

// @desc    Delete company
// @route   DELETE /api/v1/company/:id
// @access  Private
exports.deleteCompany = asyncHandler(async (req, res, next) => {
  // if the user is not an admin, they can only add one company
  if (req.user.role !== 'admin') {
    return next(new ErrorResponse(`User not authorized to access!`, 404));
  }

  const company = await Company.findById(req.params.id);
  if (!company) {
    return next(
      new ErrorResponse(`company not found with id of ${req.params.id}`, 404)
    );
  }

  company.remove();
  res
    .status(201)
    .json({ success: true, data: {}, message: 'company Deleted!' });
});
