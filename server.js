var server = require('http').createServer(response);
var io     = require('socket.io')(server);

function response(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1>Hello Nodejs</h1>');
    res.end();
}

function socketio(socket){
    socket.on('message', function(data){
        io.emit('message', data);
        console.log(data.msg);
    });
}

process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(data){
    io.emit('message', {msg: data});
});

io.on('connection', socketio);
server.listen(3000);
console.log('Server started on 3000');