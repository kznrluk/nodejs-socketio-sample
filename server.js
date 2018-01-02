var server = require('http').createServer(response);
var io     = require('socket.io')(server);
var fs     = require('fs');

var mp3 = 0;
fs.readFile('sample.mp3', function(err, data){
    mp3 = data;
});

function response(req, res){
    res.writeHead(200, {'Content-Type':'audio/mp3'});
    res.write(mp3);
    res.end();

}

function socketio(socket){
    socket.on('message', function(data){
        io.emit('message', data);
        console.log(data.msg);
    });
    socket.on('starttest', function(data){
        console.log('readfile');
        var start = (new Date()).getTime();
        io.emit('mp3data', { 'mp3':mp3, 'start':start } )
        });
}

process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(data){
    io.emit('message', {msg: data});
});

io.on('connection', socketio);
server.listen(3000);
console.log('Server started on 3000');