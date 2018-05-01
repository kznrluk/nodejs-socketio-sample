const socket = require('socket.io-client').connect('http://localhost:3000');
const fs = require('fs');
const request = require('request');

const getBytesPerSec = (startTime, endTime, dataLength) => {
    return dataLength / ((endTime - startTime) / 1000)
};

socket.on('connect', () => {
    console.log('Connected. Push Enter to start test.');
});

socket.on('sendBinaryData', data => {
    const endTime = (new Date()).getTime();
    const networkSpeedMbps = Math.round(getBytesPerSec(data.startTime, endTime, data.binary.length) * 8 / 1000 / 1000);
    console.log(`${networkSpeedMbps} Mbps`);
});

process.stdin.setEncoding('utf-8');
process.stdin.on('data', data => {
    socket.emit('start');
});
