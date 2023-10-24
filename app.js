var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Config mongoose
var mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const userAPIRouter=require('./routes/api/UserApi');

const userRouter = require('./routes/cpanel/userCpanel');


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
  .catch((err) => console.log('Connect database failed'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cpanel/useCpanel', userRouter);


//api

//http:localhost:3000/api/user
app.use('/api/user',userAPIRouter);

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
