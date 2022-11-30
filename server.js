var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');


//load the env vars
require('dotenv').config();

//create express app
var app = express();

//connect to mongoDB with mongoose, configure passport.js
require('./config/database')
require('./config/passport')

var indexRouter = require('./routes/index');
var dashboardsRouter = require('./routes/dashboards');
var categoriesRouter = require('./routes/categories');
var incomesRouter = require('./routes/incomes')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));  

// passport/oauth/session:
app.use(session({
  secret: 'budgetapp',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/dashboards', dashboardsRouter);
app.use('/', categoriesRouter)
app.use('/', incomesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send('Cant find that!')
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
