import express from 'express';
import * as http from 'http';
import expressSession from 'express-session';
import { Socket } from './socket/socket'
import { PORT, HOST } from './helpers/constants';
import path from 'path';

const app = express();
const server = http.createServer(app);
const socket = new Socket(server);

server.listen(PORT, HOST, function () {
    console.log("Server running on: " + HOST + " : " + PORT);
});

let session = expressSession({
    secret: 'my-secret',
    //store: new redisStore({ host: 'localhost', port: 6379, client: redis, ttl: 1000 }),
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

app.set('port', PORT);
app.set('host', HOST);
app.use(session);
socket.initSession(session);

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
        res.header('Access-Controll-Allow-Cridentials', 'true')
        res.sendFile(path.join(__dirname, 'client', 'build', 'manifest.json'));
    });
}

export default app;