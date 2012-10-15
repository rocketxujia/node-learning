// demo展示：
// 1. 怎么样建立一个http server
// 2. request 事件 使用
var http = require('http');
var httpServer = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});     // 这里的回调函数会添加到 request事件上。
}).on('request', function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h2>test</h2>');
});
httpServer.listen(9889);