import express from 'express';
import http from 'http';
import expressSession from 'express-session';
import { initSocket } from './socket'
import { PORT, HOST } from './helpers/constants';
import { redisStore } from './redis/redis';
import path from 'path'



const app = express();
const server = http.createServer(app);
const store = redisStore(expressSession);

let session: express.RequestHandler = expressSession({
    secret: 'my-secret',
    store: store,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 6000000,
        httpOnly: true,
        sameSite: true,
        secure: false,
    },
})

//new Socket(server, session);
//Socket(server, session).initSocket();
initSocket(server, session);

app.set('port', PORT);
app.set('host', HOST);
app.use(session);
app.get('/session', function (req, res, next) {
    console.log('Initial request.');
    res.end();
})

if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(require('express').static('../client/build'));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });

    app.get('/manifest.json', (req, res) => {
        res.header('Access-Controll-Allow-Cridentials', 'true')
        res.sendFile(path.join(__dirname, 'client', 'build', 'manifest.json'));
    });
}

if (process.env.DEBUG === 'express-session') {
    app.use((req, res, next) => {
        const { url } = req;
        const isCookieSent = req.headers.cookie;
        console.log({ url });
        console.log({ isCookieSent });
        next();
    });
}

console.log(JSON.stringify(process.env));

server.listen(PORT, HOST, function () {
    console.log("Server running on: " + HOST + " : " + PORT);
});

export default app;