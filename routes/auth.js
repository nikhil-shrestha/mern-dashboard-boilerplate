const express = require('express');

const {
  login,
  register,
  forgotPassword,
  resetPassword,
  getMe,
  updateDetails,
  updatePassword,
  logout
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/login', login);
router.get('/logout', logout);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resettoken', resetPassword);
router.get('/me', protect, getMe);
router.put('/update-details', protect, updateDetails);
router.put('/update-password', protect, updatePassword);

module.exports = router;
