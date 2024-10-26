var express = require("express");
var socket = require("socket.io");
var app = express();

app.use(express.static(__dirname));

var server = app.listen(8888, function() {
      console.log('Server is running on port http://localhost:8888');
});

var io = socket(server);

io.sockets.on('connection', function (socket) {
    socket.on('user', function (usr) {
        socket.userName = usr;
        socket.emit('greetings', 'Welcome  ' + '<b>' + socket.userName + '</b>' + ' to this message group.');
        socket.broadcast.emit('updateChat', socket.userName, ' New User just joined.');
    });
    socket.on('userImage', function (image) {
        io.sockets.emit('addimage', socket.userName, image);
    });
    socket.on('chatSMS', function (message) {
        io.sockets.emit('updateChat', socket.userName, message);
    });
});