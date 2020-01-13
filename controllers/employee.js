const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const Company = require('../models/Company');
const Employee = require('../models/Employee');

// @desc    Get all Employee
// @route   GET /api/v1/employee
// @route   GET /api/v1/company/:companyId/employee
// @route   GET /api/v1/auth/:userId/employee
// @access  Public
exports.getEmployees = asyncHandler(async (req, res, next) => {
  if (req.params.companyId) {
    const employee = await Employee.find({ company: req.params.companyId });

    return res.status(200).json({
      success: true,
      count: employee.length,
      data: employee
    });
  }

  if (req.params.userId) {
    const employee = await Employee.find({ user: req.params.userId });

    return res.status(200).json({
      success: true,
      count: employee.length,
      data: employee
    });
  }

  res.status(200).json(res.advancedResults);
});

// @desc    Get single Employee
// @route   GET /api/v1/employee/:id
// @access  Public
exports.getEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(
      new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: employee
  });
});

// @desc    Get single Employee
// @route   GET /api/v1/employee/user
// @access  Public
exports.getLoggedInEmployee = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    const employee = await Employee.findById({ user: req.user.id });

    if (!employee) {
      return next(
        new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: employee
    });
  }
});

// @desc    Add Employee
// @route   POST /api/v1/company/:companyId/employee
// @access  Private
exports.addEmployee = asyncHandler(async (req, res, next) => {
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

  const employee = await Employee.create(req.body);

  res.status(201).json({
    success: true,
    data: employee
  });
});

// @desc    Update Employee
// @route   PUT /api/v1/employee/:id
// @access  Private
exports.updateEmployee = asyncHandler(async (req, res, next) => {
  let employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(
      new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure Employee belongs to user or user is admin
  if (employee.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User not authorized to perform this action!`, 401)
    );
  }

  employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: employee
  });
});

// @desc    Delete Employee
// @route   DELETE /api/v1/employee/:id
// @access  Private
exports.deleteEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return next(
      new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure Employee belongs to user or user is admin
  if (req.user.role !== 'company_admin' && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User not authorized to perform this action!`, 401)
    );
  }

  employee.remove();
  res
    .status(201)
    .json({ success: true, data: {}, message: 'Employee Deleted!' });
});
