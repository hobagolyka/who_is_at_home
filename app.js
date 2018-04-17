const http = require('http');
const mysql = require('mysql');
const hostname = '127.0.0.1';
const port = 3000;
const arpScanner = require('arpscan');

// CONFIG
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : '',
    password : '',
    database : ''
});

function dbconnect(callback, insert) {
    connection.query('SELECT * FROM macs',
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
    }
    return;
});

var nmap = require('node-nmap');

nmap.nmapLocation = "nmap"; //default

//    Accepts array or comma separated string of NMAP acceptable hosts
var quickscan = new nmap.QuickScan('127.0.0.1 google.com');

quickscan.on('complete', function(data){
    console.log(data);
});

quickscan.on('error', function(error){
    console.log(error);
});

quickscan.startScan();

arpScanner(onResult);

function onResult(err, data){
    if(err) throw err;
    //console.log(data);
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
});

server.listen(port, hostname, () => {
});
