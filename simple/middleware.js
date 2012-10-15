// demo演示了:
// 1. 'connect ' middleware framework 的使用， http://www.senchalabs.org/connect/  or  https://github.com/senchalabs/Connect 。
// 2. 理解中间件的含义： 看注释。
var connect = require('connect')
    , http = require('http');
var app = connect();
// Middleware: 以流式方式依次处理请求，然后响应客户端或是让下一个中间件继续处理。即use函数的callback参数相当于 ‘response’event的回调函数
app.use(connect.favicon())
    .use(connect.logger('dev'))
    .use(connect.static('public'))
    .use(connect.directory('public'))
    .use(connect.cookieParser())
    .use(connect.bodyParser())
    .use(connect.session({ secret: 'my secret here' }))
    .use(function(req, res) {
        res.end('viewing user ' +  (req.body.user && req.body.user.name) );
    });
app.listen(9001);

