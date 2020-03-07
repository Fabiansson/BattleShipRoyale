var app = require("express")();
var server = require('http').Server(app);
var io = require('socket.io')(server);
let expressSession = require('express-session');
let sharedsession = require("express-socket.io-session");
const redis = require('./redis');
const redisStore = require('connect-redis')(expressSession);

var path = require('path');

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 4000;

server.listen(port, host, function () {
    console.log("Server running on: " + host + " : " + port);
});


let session = expressSession({
    secret: 'my-secret',
    store: new redisStore({ host: 'localhost', port: 6379, client: redis, ttl: 1000 }),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
        httpOnly: true,
        sameSite: true,
        secure: false,
    },
})

if (process.env.DEBUG === 'express-session') {
    app.use((req, res, next) => {
        const { url } = req;
        const isCookieSent = req.headers.cookie;
        console.log({ url });
        console.log({ isCookieSent });
        next();
    });
}

app.use(session);

io.use(sharedsession(session, {
    autoSave: true
}));

let rooms = {};

app.get('/session', function (req, res, next) {
    console.log('Initial request.');
    res.end();
})


if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(require('express').static('client/build'));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });

    app.get('/manifest.json', (req, res) => {
        res.header('Access-Controll-Allow-Cridentials', true)
        res.sendFile(path.join(__dirname, 'client', 'build', 'manifest.json'));
    });
}


io.on('connection', function (socket) {
    console.log(`socket with id ${socket.id} connection established`);
    if (socket.handshake.session.userdata) {
        console.log('Welcome back: ' + socket.handshake.session.userdata);
    } else {
        socket.handshake.session.userdata = Math.random();
        socket.handshake.session.save();
        console.log('Welcome: ' + socket.handshake.session.userdata);
    }

    socket.on('disconnect', () => {
        console.log(`Socket with id ${socket.id} disconnected.`);
    })

    /*if (typeof rooms[room] ==== "undefined") rooms[room] = {};
    rooms[room].count = rooms[room].total ? rooms[room].total+1 : 1; 
    io.to(room).emit("new user", rooms[room].count)*/

    socket.on("chatMessage", function (msg) {
        console.log('chat ' + msg.msg);
        socket.emit("chatMessage", msg.msg)
    });

    socket.on('open', async function () {
        if (!socket.handshake.session.room) {
            let randomRoomId = Math.random().toString(36).substring(7);
            let randomPlayerId = Math.random().toString(36).substring(7) + '-P';
            console.log('Room with ID: ' + randomRoomId + ' got created.');
            this.join(randomRoomId);
            await redis.setAsync(`room:${randomRoomId}`, socket.handshake.sessionID, 'NX');
            socket.handshake.session.room = randomRoomId;

            rooms[randomRoomId] = [randomPlayerId];
            io.sockets.in(randomRoomId).emit('joinRp', {
                roomId: randomRoomId,
                exist: true,
                started: rooms[randomRoomId].length >= 4,
                players: rooms[randomRoomId]
            })
        }
    });

    socket.on('join', function (data) {
        console.log('tryin to join room with id: ' + data.id);
        if (io.nsps['/'].adapter.rooms[data.id]) {
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