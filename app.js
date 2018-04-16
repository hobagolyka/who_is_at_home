const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const arpScanner = require('arpscan');

arpScanner(onResult);

function onResult(err, data){
    if(err) throw err;
    console.log(data);
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain');
res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
