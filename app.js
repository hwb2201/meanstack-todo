var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
//mongodb connection
mongoose.connect('mongodb://localhost:27017/todo');

var Todo = require('./app/models/todo');

//matching routes folder
var routes = require('./routes/index');

var app = express();

app.settings.env = 'development'; // or 'production'

// 뷰로 사용할 파일의 위치 지정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//use()는 express 에서 제공하는 미들웨어를 사용하도록 함
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
// log every request to the console
app.use(bodyParser.json());
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ type : 'application/bnd.api+json'}));
// parse application/vnd.api+json as json
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// set the static files location /public/img will be /img for users


app.use('/api', routes);
app.route('/').all(function(req, res, next) {
	res.render('index', {
		title : '앵귤러!'	   
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('찾을 수 없습니다.');
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
