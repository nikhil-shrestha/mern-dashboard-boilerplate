const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  remarks: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [256, 'Name cannot be more than 256 characters']
  },
  ipAddress: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  punchIn: {
    type: Date,
    default: Date.now
  },
  punchInStatus: {
    type: Boolean,
    default: true
  },
  punchOut: Date,
  punchOutStatus: Boolean,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});
module.exports = mongoose.model('Attendance', AttendanceSchema);
