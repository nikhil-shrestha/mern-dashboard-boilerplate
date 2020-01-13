const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  title: {
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true
  }
});
module.exports = mongoose.model('Position', PositionSchema);
