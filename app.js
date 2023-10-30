var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Config mongoose
var mongoose = require('mongoose');
require('./components/Incident/IncidentModel');
require('./components/Report/ReportModel');


var indexRouter = require('./routes/index');

const userAPIRouter=require('./routes/api/UserApi');

const userRouter = require('./routes/cpanel/userCpanel');


//api
const reportAPIRouter=require('./routes/api/ReportApi');
const incidentAPIRouter=require('./routes/api/IncidentApi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Connect database
mongoose.connect('mongodb+srv://ServerFPLAdmin:!23456@severfpladmin.hdh9gyu.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connect database successfully'))
  .catch((err) => console.log('Connect database failed', err));


app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/cpanel/useCpanel', userRouter);


//api

//http:localhost:3000/api/user
app.use('/api/user',userAPIRouter);

//Dành cho API
//http:localhost:3000/api/report
app.use('/api/report',reportAPIRouter);
//http:localhost:3000/api/incident
app.use('/api/incident',incidentAPIRouter);
//http:localhost:3000/api/incident
app.use('/api/status',statusAPIRputer);


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

module.exports = app;
