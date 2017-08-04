var express = require('express');
var mongoose =require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session=require('express-session');
var passport=require('passport');
var flash= require('connect-flash');
var async= require('async');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var index = require('./routes/index');
var med = require('./routes/med');
var login = require('./routes/login');
var my = require('./routes/my');
var config= require('./config/config')
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://'+config.account.mongoid+':'+config.account.mongopw+'@ds129030.mlab.com:29030/freedombear');

var db = mongoose.connection;
db.once("open",function(){
  console.log("DB connected!");
});
db.on("error",function (err){
  console.log("DB ERROR :", err);
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
  secret : "freedombear",
  key: "freedombear",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000*60*60 
  }  
}));
app.use(passport.initialize());
app.use(passport.session());

app.all('/my*', my);
app.all('/med*', med);
app.all('/login*', login);
app.all('/howto*', index);
app.all('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//localhost 실행시
 app.listen(3010,function(){
   console.log("Server connected");
 });

//app.listen(process.env.PORT, process.env.IP);  //c9 실행시 알아서 주석을 없애요

module.exports = app;