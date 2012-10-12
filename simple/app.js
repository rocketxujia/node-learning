var http = require('http');
var fs = require('fs');

var options = {
    host: 'www.diandian.com',
    port: 80,
    path: '/',
    method: 'get'
};
var req = http.get(options, function(res) {
    console.log('req on "response" event handler. firstly ');
}).on( 'response', function(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    }).on('end', function(){
        console.log('\n\n body 完毕！！');
    });
}).on('error', function(e) {
    console.log('problem with request: ' + e.message);
}).on( 'end', function(chunk){
    console.log('request: "end" event handler.  ');
});
req.end();    // end the request( get 方法可以省略，但http.request 必须有)


var httpServer = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
}).on('request', function (request, response) {

    var rData = '';
    request.setEncoding('utf-8');
    request.on( 'data', function(chunk){
        rData += chunk;
    }).on( 'end', function(chunk){
        console.log('request: "end" event handler.  ');
    });
    request.emit('data', 'test');

    response.end('Hello World1: ' + rData);
    console.log('httpServer: "request" event handler.  ');
});
httpServer.listen(9888);


// 一些 全局变量
console.log('Prefix: ' + process.version);

// fs demo
fs.writeFile('./test.js', 'data', encoding='utf8');

// dns 模块 demo
var dns = require('dns');
dns.resolve4('www.google.com', function (err, addresses) {
    if (err) throw err;
    console.log('addresses: ' + JSON.stringify(addresses));
    addresses.forEach(function (a) {
        dns.reverse(a, function (err, domains) {
            if (err) {
                console.log('reverse for ' + a + ' failed: ' +
                    err.message);
            } else {
                console.log('reverse for ' + a + ': ' +
                    JSON.stringify(domains));
            }
        });
    });
});
