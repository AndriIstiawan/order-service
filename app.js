var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const order = require('./component/route');

const CONFIG = require('./config/config');
const JOB = require('./config/cron-job');
const mongoose = require('mongoose');
const dbConnBuilder = require('./config/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({ message: 'Orders service is running properly', status: 'OK' });
});
app.use('/api/order/v1', order);

JOB.start();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Log the environment
console.log('Environment:', CONFIG.app);

// DB Setup
const dbConnUri = dbConnBuilder(CONFIG);
console.log('Connection URI:', dbConnUri);
mongoose.connect(dbConnUri, { useNewUrlParser: true });
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

const server = app.listen(process.env.PORT || 4000, function (err, res) {
  const port = server.address().port;
  console.log('Application is running.. ');
  console.log(`Open in your browser http://localhost:${port}`);
});

module.exports = app;
