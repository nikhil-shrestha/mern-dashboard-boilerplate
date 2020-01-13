const express = require('express');

const {
  getEmployees,
  getEmployee,
  getLoggedInEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employee');

const Employee = require('../models/Employee');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, advancedResults(Employee), getEmployees)
  .post(protect, authorize('admin', 'company_admin'), addEmployee);

router
  .route('/:id')
  .put(protect, authorize('admin', 'company_admin', 'user'), getEmployee)
  .put(protect, authorize('admin', 'company_admin', 'user'), updateEmployee)
  .delete(protect, authorize('admin', 'company_admin'), deleteEmployee);

router.route('/user').get(protect, getLoggedInEmployee);

module.exports = router;
