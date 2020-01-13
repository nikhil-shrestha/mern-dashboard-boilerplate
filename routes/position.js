const express = require('express');

const {
  getPositions,
  addPosition,
  updatePosition,
  deletePosition
} = require('../controllers/position');

const Position = require('../models/Position');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, advancedResults(Position), getPositions)
  .post(protect, authorize('admin', 'company_admin'), addPosition);

router
  .route('/:id')
  .put(protect, authorize('admin', 'company_admin'), updatePosition)
  .delete(protect, authorize('admin', 'company_admin'), deletePosition);

module.exports = router;
