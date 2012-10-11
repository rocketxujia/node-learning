var http = require('http');
var fs = require('fs');

var options = {
    host: 'www.baidu.com',
    port: 80,
    path: '/',
    method: 'get'
};
var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});


req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.on( 'data', function(chunk){
    console.log('req "data" event handler.  ' + chunk);
});

req.on( 'end', function(chunk){
    console.log('request: "end" event handler.  ');
});

// write data to request body
req.write('wd=intell');
req.end();

/* ================================================================  */
var httpServer = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});

});

httpServer.on('request', function (request, response) {
    var rData = '';
    request.setEncoding('utf-8');
    request.on( 'data', function(chunk){
        rData += chunk;
    });

    request.on( 'end', function(chunk){
        console.log('request: "end" event handler.  ');
    });

    //req.emit('data', 'test0');
    request.emit('data', 'test');

    response.end('Hello World1: ' + rData);
    console.log('httpServer: "request" event handler.  ');
});

/*httpServer.on('connection', function (socket) {
    response.end('connection\n');
    console.log('httpServer: "connection" event handler.  ');
});*/

httpServer.on('connect', function (request, socket, head) {
    response.end('connect\n');
    console.log('httpServer: "connect" event handler.  ');
});

httpServer.listen(8124);

/*
httpServer.listen('/socket', function(request, response){
    console.log( 'socket' );
});*/
console.log('Prefix: ' + process.version);

fs.writeFile('./test.js', 'data', encoding='utf8');

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