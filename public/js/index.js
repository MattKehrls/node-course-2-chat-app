var socket = io();

socket.on('connect', function () {
    console.log('Connected to SERVER!');

    // socket.emit('createMessage', {
    //     from: 'Mark',
    //     text: 'Hey. Its Mark.'
    // });
});


socket.on('disconnect', function () {
    console.log('Disconnected from SERVER!');
});

socket.on('newMessage', function (message) {
    console.log("New Message!" , message);
    var li = $('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    $('#messages').append(li);
});

// socket.on('welcomeMessage', function (message) {
//     console.log(message.text);
// });

// socket.on('joinMessage', function (message) {
//     console.log(message.text);
// });

// socket.emit('createMessage', {
//     from : 'Frank',
//     text: 'Hi'
// }, function (data) {
//     console.log('Got it!', data);
// });


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {

    });
});