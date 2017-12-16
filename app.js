var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
require('./db');
async = require('async');
_ = require('underscore-node');
_fn = require('./inc/function.js');
_config = require('./inc/config.js');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'fhyq9w8y23432g4y3',
  resave: true,
  saveUninitialized:true,  
  cookie: { maxAge: 360000 }//1小時
}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
var routes = require('./routes/list');
var user = require('./routes/user');
var api = require('./routes/api');
var chat = require('./routes/chat');
var login = require('./routes/login');
var cate = require('./routes/cate');
var myroom = require('./routes/myroom');
var register = require('./routes/register');
var webrtc = require('./routes/webrtc');
var test = require('./routes/test');
var room = require('./routes/room');
app.use('/', routes);
app.use('/user', user);
app.use('/api', api);
app.use('/chat', chat);
app.use('/chat/:id', chat);
app.use('/login', login);
app.use('/cate', cate);
app.use('/myroom', myroom);
app.use('/register', register);
app.use('/webrtc', webrtc);
app.use('/test', test);
app.use('/room', room);


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
