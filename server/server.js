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

    socket.emit('newEmail', {
        from: 'mike@example.com',
        text: "Hey, what is going on?!",
        createdAt: 123
    });

    socket.emit('newMessage', {
        from: 'josh@example.com',
        text: "Hey, you owe me money!",
        createdAt: 433
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message); 
    });

   

    socket.on('disconnect', () => {
        console.log('User Disconnected!');
    });
});



server.listen(port, () => {
    console.log(`Started up @ ${port}`);
});


// module.exports = {app};