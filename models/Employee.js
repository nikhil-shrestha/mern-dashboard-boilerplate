const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  code: {
    type: String,
    required: [true, 'Please add a Employee Code']
  },
  ipAddress: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    fullAddress: String,
    streetName: String,
    wardNo: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: 'Department',
    required: true
  },
  position: {
    type: mongoose.Schema.ObjectId,
    ref: 'Position',
    required: true
  }
});

// encrypt password using bcrypt
EmployeeSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// sign JWT and return
EmployeeSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// match Employee entered password to hashed password in database
EmployeeSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate and hash password token
EmployeeSchema.methods.getResetPasswordToken = function() {
  // generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('Employee', EmployeeSchema);
