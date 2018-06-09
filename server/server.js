const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app); //making a server using the built in http module. Server now runs on that instead of express
var io = socketIO(server);// returns web socket server, ready to except connections
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected!');
    // socket.emit('newMessage', {
    //     from: 'josh@example.com',
    //     text: "Hey, you owe me money!",
    //     createdAt: 433
    // });
    socket.on('join', (params, callback) => {
        // console.log(isRealString(params.name));
        // console.log(isRealString(params.room));
        if (!isRealString(params.name) || !isRealString(params.room)) {
           return callback("Name and room are empty!");
        }

        socket.join(params.room); //Joins the room
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', `Welcome to the chat app,${params.name} !`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`)); 

        callback();
    });


    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); 
        }
        
        callback();
        // io.emit('newMessage', { //Emits to EVERY socket
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
        // socket.broadcast.emit('newMessage', { //Emits to every socket but that one.
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // }); 
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user) {
             io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected!');
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name}, has left.`));
        }
    });
});//ON CONNECTION END



server.listen(port, () => {
    console.log(`Started up @ ${port}`);
});


// module.exports = {app};