
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.engine('json', require('ejs').renderFile);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var options = {
    host: 'www.diandian.com',
    port: 80,
    path: '/notes?postId=08510940-ae9a-11e0-9f84-782bcb383976',
    method: 'GET'
};
/*var req = http.request(options, function(response) {*/
var req = http.get(options, function(response) {
    console.log("statusCode: ", response.statusCode);
    console.log('HEADERS: ' + response.headers);
    /*response.setEncoding('utf-8');*/
    response.on('data', function(d) {
        console.log('body:'  + d);
    });
    response.on('end', function(){
        console.log('\n\n body 完毕！！');
    });
});

// 记得关闭请求流。
req.end();


app.get('/', routes.index);
app.get('/users', user.list);
app.get('/config', function(req, res){
    res.setHeader("Content-Type", "application/json");
    res.render('config.json', { title: 'Express' } );
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
