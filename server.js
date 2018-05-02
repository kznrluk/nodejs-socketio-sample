const server = require('http').createServer();
const io     = require('socket.io')(server);
const fs     = require('fs');

const FILE_PASS = 'sample.mp3';
const binaryData = fs.readFileSync(FILE_PASS);

io.on('connection', socket => {
    console.log('Connected.')
    socket.on('start', data => {
        io.emit('sendBinaryData', { 'binary': binaryData, 'startTime': (new Date()).getTime() });
    });
});

server.listen(3000);
console.log('Server started on 3000');