const http = require('http');
const mysql = require('mysql');
const arpScanner = require('arpscan');

// CONFIG
const hostname = '127.0.0.1';
const port = 3000;
var db = [];
var arp = [];
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : '',
    password : '',
    database : ''
});

// FUNCTIONS
function dbconnect(callback, query) {
    connection.query(query,
        function(err,row){
        if (err) {
            throw err;
        }
        return callback(err, row);
    });
}


dbconnect(function(err, result){
    if (err) throw err;
    else {
        console.log(result);
        db = result;
    }
    return;
}, 'SELECT * FROM macs');

arpScanner(onResult);

function onResult(err, data){
    if(err) throw err;

    arp = data;
}

console.log(db);
console.log(arp);
const server = http.createServer((req, res) => {
    res.statusCode = 200;
});

server.listen(port, hostname, () => {
});
