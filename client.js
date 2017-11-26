var socket = require('socket.io-client').connect('http://localhost:3000');

socket.on('connect', function(){
    console.log('Connected');
});
socket.on('message', function(data){
    console.log(data.msg);
});
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(data){
    socket.emit('message', {msg: data});
});
