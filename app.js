var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let expressHBS=require('express-handlebars');
let flash=require('express-flash');
let session=require('express-session')
let passport = require('passport');


let regRouter=require('./routes/register');
let methodOverride=require('method-override');


let initializePassport=require('./routes/passport-config')
    initializePassport(passport,
    email=> regRouter.users.find(user=> user.email=== email),
    id=> regRouter.users.find(user=> user.id===id));



var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.engine('.hbs',expressHBS({defaultLayout: 'layout',extname:'.hbs'}))
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(session({secret:'mysecret',resave:false,saveUninitialized:false}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',regRouter.router);
app.use('/login',loginRouter);
app.use('/profile', indexRouter);

app.delete('/logout',(req,res)=>{
  req.logOut();
  res.redirect('/login')
})


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
