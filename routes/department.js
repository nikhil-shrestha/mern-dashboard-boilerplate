const express = require('express');

const {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/department');

const Department = require('../models/Department');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, advancedResults(Department), getDepartments)
  .post(protect, authorize('admin', 'company_admin'), addDepartment);

router
  .route('/:id')
  .put(protect, authorize('admin', 'company_admin'), updateDepartment)
  .delete(protect, authorize('admin', 'company_admin'), deleteDepartment);

module.exports = router;
