const server = require('http').createServer();
const io     = require('socket.io')(server);
const fs     = require('fs');

const FILE_NAME = 'sample.mp3'

process.stdin.setEncoding('utf-8');

var binaryData = 0;
fs.readFile(FILE_NAME, (err, data) => {
    binaryData = data;
    console.log('File loaded.');
});

io.on('connection', socket => {
    console.log('Connected.')
    socket.on('start', data => {
        io.emit('sendBinaryData', { 'binary': binaryData, 'startTime': (new Date()).getTime() });
    });
});
server.listen(3000);
console.log('Server started on 3000');