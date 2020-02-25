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

let rooms = {};

io.on('connection', function (socket) {
    console.log('socket connection established');


    /*if (typeof rooms[room] ==== "undefined") rooms[room] = {};
    rooms[room].count = rooms[room].total ? rooms[room].total+1 : 1; 
    io.to(room).emit("new user", rooms[room].count)*/

    socket.on("chatMessage", function (msg) {
        socket.emit("chatMessage", msg.msg)
    });

    socket.on('open', function () {
        let randomRoomId = Math.random().toString(36).substring(7);
        let randomPlayerId = Math.random().toString(36).substring(7) + '-P';
        console.log('Room with ID: ' + randomRoomId + ' got created.');
        this.join(randomRoomId);
        rooms[randomRoomId] = [randomPlayerId];
        io.sockets.in(randomRoomId).emit('playerJoined', {
            players: rooms[randomRoomId]
        })
        socket.emit('roomCreated', { id: randomRoomId });
    });

    socket.on('join', function(data) {
        console.log('tryin to join room with id: ' + data.id);
        if(io.nsps['/'].adapter.rooms[data.id]) {
            console.log('found matching room to join');
            let randomPlayerId = Math.random().toString(36).substring(7) + '-P';
            rooms[data.id] = [...rooms[data.id], randomPlayerId]
            this.join(data.id);
            io.sockets.in(data.id).emit('checkRoomResponse', {
                //ok: Object.keys(io.nsps).includes('/' + data.id)
                ok: true
            });
            io.sockets.in(data.id).emit('playerJoined', {
                players: rooms[data.id]
            })
        } else {
            console.log('no matching room found to join');
            socket.emit('checkRoomResponse', {
                ok: false
            });
        }
    })
});