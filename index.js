var app = require("express")();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require('path');

//CORS HERRE
//var routes = require("./routes/routes.js");

//routes(app);

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 4000;

server.listen(port, host, function () {
    console.log("Server running on: " + host + " : " + port);
});

if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}



io.on('connection', function (socket) {
    console.log('socket connection established');
    socket.on('checkRoomId', function(data) {
        socket.emit('checkRoomResponse', { 
            ok: Object.keys(io.nsps).includes('/' + data.id)
        });
    })
    
    socket.on('open', function () {
        let randomRoomId = Math.random().toString(36).substring(7);
        console.log('Room with ID: ' + randomRoomId + ' got created.');
        socket.emit('roomCreated', { id: randomRoomId });
        const nsp = io.of('/' + randomRoomId);
        nsp.on('connection', function(socket){
          console.log('someone connected to: ' + randomRoomId);
          nsp.emit('playerJoined', {playerName: 'Paul'});
        });
    });
});