const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const methodOverride = require('method-override')
// const passport = require('passport')
// const LocalStrategy = require('passport-local');

const app = express();

// Passport Configure
app.use(require("express-session")({
  secret: "ast u",
  resave: false,
  saveUninitialized: false
}));
// app.use(passport.initialize());
// app.use(passport.session());

const db = require('./models');

 
// // use static authenticate method of model in LocalStrategy
// passport.use(new LocalStrategy(db.User.authenticate()));
 
// // use static serialize and deserialize of model for passport session support
// passport.serializeUser(db.User.serializeUser());
// passport.deserializeUser(db.User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// requires the model with Passport-Local Mongoose plugged in



//Parsar application json
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true , saveUninitialized :true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
