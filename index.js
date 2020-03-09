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

let s = require('./socket').initSocket(io);

