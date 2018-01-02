var socket = require('socket.io-client').connect('http://192.168.213.28:3000');
var fs = require('fs');
var request = require('request');

socket.on('connect', function(){
    console.log('Connected');
});
socket.on('message', function(data){
    console.log(data.msg);
});

socket.on('mp3data', function(data){
    var end = (new Date()).getTime();
    var sec = (end - data.start) / 1000;
    var bytesPerSec = Math.round(data.mp3.length / sec);
    console.log((bytesPerSec * 8 / 1000 / 1000) + 'Mbps');
});

function getwithHttp(){
    var start = (new Date()).getTime();
    request('http://localhost:3000/', function(err, res, body){
        var end = (new Date()).getTime();
        var sec = (end - start) / 1000;
        var bytesPerSec = Math.round(body.length / sec);
        console.log((bytesPerSec * 8 / 1000 / 1000) + 'Mbps');
    });
};

process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(data){
    //getwithHttp();
    socket.emit('starttest', {msg: data});
});
