// demo： 一些小模块展示
var http = require('http');
var fs = require('fs');

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
