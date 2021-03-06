//
var http = require('http');
var net = require('net');
var url = require('url');

// Create an HTTP tunneling proxy
// 首先建立一个 http形式的
var proxy = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('okay');
});
proxy.on('connect', function(req, cltSocket, head) {
    // connect to an origin server
    var srvUrl = url.parse('http://' + req.url);
    var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, function() {
        cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
            'Proxy-agent: Node-Proxy\r\n' +
            '\r\n');
        srvSocket.write(head);
        srvSocket.pipe(cltSocket);
        cltSocket.pipe(srvSocket);
    });
});

// now that proxy is running
proxy.listen(1337, '127.0.0.1', function() {
    // make a request to a tunneling proxy
    var options = {
        port: 1337,
        host: '127.0.0.1',
        method: 'CONNECT',
        path: 'www.baidu.com:80'
    };

    var req = http.request(options);
    req.end();

    req.on('connect', function( res, socket ) {
        console.log('got connected!');

        // make a request over an HTTP tunnel
        socket.write('GET / HTTP/1.1\r\n' +
            'Host: www.baidu.com:80\r\n' +
            'Connection: close\r\n' +
            '\r\n');
        var chunks = '';
        socket.on('data', function(chunk) {
            chunks += chunk;
        });
        socket.on('end', function() {
            console.log('chunks: \n' + chunks.toString());
            proxy.close();
        });
    });
});