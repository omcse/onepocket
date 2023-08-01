var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//1.Hello, World API need to hit localhost:3000
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

//2. takes an aaray and sum all the number.
let arr=[1, 2, 3, 4, 5, 6, 7, 9, 732]
function sumOfNumber(arr){
  let sum = 0;
  for(let i=0; i<arr.length; i++){
    sum = sum + parseInt(arr[i]);
  }
  return sum;
}

let sum = sumOfNumber(arr);
console.log(`sum of numbers in array ${sum}`);

// 3. word count in a file
function getWordCount(){
  const data = fs.readFileSync('./data.txt', "utf8");
  return data.split(" ").length;
}
let wordCount = getWordCount();
console.log(`Word count in text file is ${wordCount}`);

module.exports = app;
