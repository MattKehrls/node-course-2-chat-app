var socket = io();

socket.on('connect', function () {
    console.log('Connect to SERVER!');

    socket.emit('createMessage', {
        from: 'Mark',
        text: 'Hey. Its Mark.'
    });
});


socket.on('disconnect', function () {
    console.log('Disconnect from SERVER!');
});

socket.on('newMessage', function (message) {
    console.log("New Message!" , message);
});