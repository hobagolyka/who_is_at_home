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
        (err,row) => {
        if (err) {
            throw err;
        }
        return callback(err, row);
});
}

arpScanner(onResult);

function onResult(err, data){
    if(err) throw err;
    if(data.length > 0) {
        data.forEach((item) => {
            dbconnect((err, result) => {
            if (err) throw err;
            return;
        }, 'INSERT INTO macs (MAC, flag) VALUES(' + mysql.escape(parseInt(item.mac, 16)) + ', 0)');
    });
    }
}

dbconnect((err, result) => {
    if (err) throw err;
    else { console.log(result);}
    return;
}, 'select * from macs');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
});

server.listen(port, hostname, () => {
});
