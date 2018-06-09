var socket = io();


function scrollToBottom () {
    //Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop  + newMessageHeight + lastMessageHeight >=  scrollHeight) {
        messages.scrollTop(scrollHeight);
    }

}

socket.on('connect', function () {

    var params = $.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            // console.log("No ERROR");
        }
    });
});

socket.on('disconnect', function () {
    // console.log('Disconnected from SERVER!');
});

socket.on('updateUserList', function (users) {
    // console.log('users list: ', users);
    var ol = $('<ol></ol>');

    users.forEach(function (user) {
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol)
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();

    // console.log("New Message!" , message);
    // var li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // $('#messages').append(li);
});

// socket.emit('createMessage', {
//     from : 'Frank',
//     text: 'Hi'
// }, function (data) {
//     console.log('Got it!', data);
// });

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var locTemplate = $('#location-message-template').html();
    var html = Mustache.render(locTemplate, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
    
    // var formattedTime = moment(message.createdAt).format('h:mm a')
    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My current location</a>');

    // li.text(`${message.from} ${formattedTime} : `);
    // a.attr('href', message.url);
    // li.append(a);
    // $('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
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


