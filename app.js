var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const multer = require('multer')
const methodOverride = require('method-override')
const session = require('express-session')
const cors = require('cors')
const redis = require('redis')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()
// USERS
var authRouter = require('./app/auth/router');
var landingPageRouter = require('./app/landingpage/router');
var userRouter = require('./app/user/router');
var itemRouter = require('./app/item/router');
var topupRouter = require('./app/topup/router');

// ADMIN
var adminRouter = require('./app/admin/router');
var adminDashboardRouter = require('./app/adminDashboard/router');
var categoryRouter = require('./app/category/router');
var expeditionRouter = require('./app/expedition/router');
var bankRouter = require('./app/bank/router');

var app = express();
app.use(cors())
app.use(session({
  secret:'wtsrtsgt1234@3#22',

  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, './public')
  },
  filename: (req, file, cb)=>{
    cb(null, new Date().getTime() + '-'+file.originalname)
  }
})
const fileFilter = (req, file, cb)=>{
  if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
    cb(null, true);
  }else{
    cb(null, false);
  }
}
redisClient.on('error', (err) => console.log(`Fail to connect with redis. ${err}`));
redisClient.on('connect', () => console.log('Successful to connect with redis'));

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))
app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte', express.static(path.join(__dirname, '/node_modules/admin-lte/')));

// ADMIN
app.use('/admin', adminRouter);
app.use('/admin/dashboard', adminDashboardRouter);
app.use('/admin/category', categoryRouter);
app.use('/admin/expedition', expeditionRouter);
app.use('/admin/bank', bankRouter);
//API
app.use('/', authRouter);
app.use('/', landingPageRouter);
app.use('/user', userRouter);
app.use('/user/topup', topupRouter);
app.use('/api/item', itemRouter)


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
