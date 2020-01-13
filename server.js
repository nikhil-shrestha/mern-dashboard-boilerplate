const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// load env vars
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

// route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const company = require('./routes/company');
const attendance = require('./routes/attendance');
const department = require('./routes/department');
const position = require('./routes/position');
const employee = require('./routes/employee');

const app = express();

// body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// file uploading
app.use(fileupload());

// sanitize data
app.use(mongoSanitize());

// set security headers
app.use(helmet());

// prevent XSS attacks
app.use(xss());

// rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100
});
app.use(limiter);

// prevent http param pollution
app.use(hpp());

// enable CORS
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'client/public')));

// mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/company', company);
app.use('/api/v1/attendance', attendance);
app.use('/api/v1/department', department);
app.use('/api/v1/position', position);
app.use('/api/v1/employee', employee);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error:: ${err.message}`.red);
  // close server & exit process
  server.close(() => process.exit(1));
});
