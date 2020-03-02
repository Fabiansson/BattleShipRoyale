var app = require("express")();
var server = require('http').Server(app);
var io = require('socket.io')(server);
let expressSession = require('express-session');
let sharedsession = require("express-socket.io-session");
//const redis = require('./redis');
//const redisStore = require('connect-redis')(expressSession);
//var cors = require('cors');

var path = require('path');

//CORS HERRE
//var routes = require("./routes/routes.js");

//routes(app);

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 4000;

server.listen(port, host, function () {
    console.log("Server running on: " + host + " : " + port);
});



let session = expressSession({
    secret: 'my-secret',
    //store: new redisStore({ host: 'localhost', port: 6379, client: redis, ttl: 260}),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 10000,
        httpOnly: true,
        sameSite: true,
        secure: false,
    },
})

  app.use(session);


let rooms = {};

if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(require('express').static('client/build'));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

io.use(sharedsession(session, {
    autoSave: true
}));


io.on('connection', function (socket) {

    console.log(`socket with id ${socket.id} connection established`);
    
    
        socket.handshake.session.userdata = Math.random();
        socket.handshake.session.save();
    
    
    console.log(socket.handshake.sessionID);

    socket.on('disconnect', () => {
        console.log(`Socket with id ${socket.id} disconnected.`);
    })


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
        io.sockets.in(randomRoomId).emit('joinRp', {
            roomId: randomRoomId,
            exist: true,
            started: rooms[randomRoomId].length >= 4,
            players: rooms[randomRoomId]
        })
    });

    socket.on('join', function(data) {
        console.log('tryin to join room with id: ' + data.id);
        if(io.nsps['/'].adapter.rooms[data.id]) {
            console.log('found matching room to join');
            let randomPlayerId = Math.random().toString(36).substring(7) + '-P';
            rooms[data.id] = [...rooms[data.id], randomPlayerId]
            this.join(data.id);
            let players = rooms[data.id].length;
            io.sockets.in(data.id).emit('joinRp', {
                roomId: data.id,
                exist: true,
                startet: players >= 4,
                players: rooms[data.id]
            });
            
        } else {
            console.log('no matching room found to join');
            socket.emit('joinRp', {
                exists: false,
                started: false,
                players: []
            });
        }
    })
});