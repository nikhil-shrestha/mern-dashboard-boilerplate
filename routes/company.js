const express = require('express');

const {
  getCompanies,
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/company');

const router = express.Router();

// include other resource routers
const departmentRouter = require('./department');
const positionRouter = require('./position');

const Company = require('../models/Company');

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// re-route into other resource routers
router.use('/:companyId/department', departmentRouter);
router.use('/:companyId/position', positionRouter);

router
  .route('/')
  .get(protect, authorize('admin'), advancedResults(Company), getCompanies)
  .post(protect, authorize('admin'), createCompany);

router
  .route('/:id')
  .get(getCompany)
  .put(protect, authorize('company', 'admin'), updateCompany)
  .delete(protect, authorize('admin'), deleteCompany);

module.exports = router;
