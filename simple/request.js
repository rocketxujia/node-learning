// demo演示了http.request发送请求到本地的过程。
// api:  http.request, http.get
var http = require('http');
var fs = require('fs');

var options = {
    host: 'localhost',
    port: 9003,
    path: '/',
    method: 'post'
};
var req = http.get(options, function(res) {
    console.log('req on "response" event handler. firstly ');
}).on( 'response', function(res){
        var chunks = '';
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.on('data', function (chunk) {
            chunks += chunk;
        }).on('end', function(){
                console.log('BODY: ' + chunks);
                console.log('\n\n body 完毕！！');
            });
    }).on('error', function(e) {
        console.log('problem with request: ' + e.message);
    }).on( 'end', function(chunk){
        console.log('request: "end" event handler.  ');
    });
req.write('data=99');   // 注意： post 可写数据，但get方式就不能写数据
req.end();    // end the request( get 方法可以省略，但http.request 必须有)


var httpServer = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h2>test</h2>');
}).listen('9003');