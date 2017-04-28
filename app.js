var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');
var session = require('express-session');
var mongoose = require('mongoose');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHot = require('webpack-hot-middleware');
var webpack = require('webpack');
var passport = require('passport');

var webpackConf = require('./webpack.config');
var index = require('./controllers/index');
var signup = require('./controllers/signup');
var signin = require('./controllers/signin');
var verify = require('./controllers/verify');
var user = require('./controllers/users');
var posts = require('./controllers/posts')
var accounts = require('./controllers/accounts');
var comment = require('./controllers/comments');
var relationships = require('./controllers/relationships');
var search = require('./controllers/search');
var notif = require('./controllers/notifications')
var config = require('./config/main');
var users = require('./models/user');

var app = express();

var compiler = webpack(webpackConf);
app.use(webpackMiddleware(compiler));
app.use(webpackHot(compiler));

mongoose.connect(config.database);
mongoose.Promise = global.Promise;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/a6422857a4d6660a5cc9', notif);
app.use('/0bb64acdf3e53da335b2', search);
app.use('/relationships', relationships);
app.use('/comment', comment);
app.use('/posts', posts);
app.use('/accounts', accounts);
app.use('/user', user);
app.use('/verify', verify);
app.use('/signin', signin);
app.use('/signup', signup);
app.use('/', index);

var port = process.env.PORT || '3000';

app.listen(port, function(){
  console.log('Server running on port 127.0.0.1:3000');
});


module.exports = app;
