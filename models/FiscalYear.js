const mongoose = require('mongoose');

const FiscalYearSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  yearStart: {
    type: Date
  },
  yearEnd: {
    type: Date
  },
  remarks: {
    type: String,
    maxlength: [256, 'Name cannot be more than 256 characters']
  }
});
module.exports = mongoose.model('FiscalYear', FiscalYearSchema);
