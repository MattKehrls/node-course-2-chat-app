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
    var formattedTime = moment(message.createdAt).format('h:mm a')
    console.log("New Message!" , message);
    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
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

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from} ${formattedTime} : `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);

});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    });
});


var locationButton = $('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert("Geo-Location is NOt supported by your browser!");
    } 

    locationButton.attr('disabled', 'disabled').text("Sending Location..!");

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text("Send Location");
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function () {
        locationButton.removeAttr('disabled').text("Sending Location");
        alert('Unable to fetch location');
    });
});


