const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  remarks: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [256, 'Name cannot be more than 256 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  dateFrom: {
    type: Date,
    required: [true, 'Please add a Date From']
  },
  dateTo: {
    type: Date,
    required: [true, 'Please add a Date To']
  },
  type: {
    type: String,
    enum: ['Personal', 'Sick', 'Floating'],
    required: [true, 'Please add a Leave Type']
  },
  status: {
    type: String,
    enum: ['Approved', 'Reject', 'Pending']
  }
});
module.exports = mongoose.model('Leave', LeaveSchema);
