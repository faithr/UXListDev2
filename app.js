var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);
//var db = require('./routes/database');
//app.get("/SKD", db.getActivities);
//app.get("/SKA", db.getAllActivities);
//app.get("/SKC", db.getCategories);
//app.get("/SKCD", db.getCategoriesDict);
//app.post('/SKPP',  db.providerProfile);
app.use('/states/*',  function(req, res){
  var filename = req.params['0'];
  //if(!filename) return;  // might want to change this
  res.render( "states/"+filename );
});
app.use('/partials/*',  function(req, res){
  var filename = req.params['0'];
  //if(!filename) return;  // might want to change this
  console.log(filename);
  res.render( "partials/"+filename );
});
app.use('/*',routes);
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
