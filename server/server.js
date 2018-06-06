const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app); //making a server using the built in http module. Server now runs on that instead of express
var io = socketIO(server);// returns web socket server, ready to except connections

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected!');

    socket.on('disconnect', () => {
        console.log('User Disconnected!');
    })
});



server.listen(port, () => {
    console.log(`Started up @ ${port}`);
});


// module.exports = {app};