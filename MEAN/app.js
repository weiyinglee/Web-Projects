var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');         // our database
var db = require('./routes/db');            // importing our database model
var sessions = require('client-sessions');  // Create our sessions
var bcrypt = require('bcryptjs');           // Encrypted our password

var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));    // Viewing the views folder
app.engine('html', require('ejs').renderFile);      // Enable on reading html files
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set our session middleware
app.use(sessions({
    cookieName: 'session',
    secret: 'jhfsfdghbvfgilmhkyfd2354gjycq3',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    ephemeral: true
}));

app.use(express.static(path.join(__dirname, 'public')));    // Make our files grabing data from public directory

// Our routes
app.use('/', routes);   // Client views
app.use('/api', api);   // API

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
