import { RequestHandler } from 'express';
import { Server } from 'http';
import socket from 'socket.io';
import sharedSession from 'express-socket.io-session';
import { initHandlers } from './socketController';

/*export class Socket {
    public io: socket.Server

    constructor(http: Server, session: RequestHandler) {
        this.io = socket(http)
        this.initSession(session);
        this.connect()
    }

    public initSession(session: RequestHandler) {
        this.io.use(sharedSession(session, { autoSave: true }));
    }

    public connect() {
        this.io.on('connection', (socket: socket.Socket) => {
            console.log(`socket with id ${socket.id} connection established`);
            if (socket.handshake.session.userId) {
                console.log('Welcome back: ' + socket.handshake.session.userId);
            } else {
                socket.handshake.session.userId = Math.random().toString(36).substring(7) + '-P';
                socket.handshake.session.save(() => {
                    console.log('Welcome: ' + socket.handshake.session.userId);
                });
            }
            initHandlers(this.io, socket)
        })
    }
}

export const Socket = (http: Server, session: RequestHandler) => {
    const io: socket.Server = socket(http);
    return {
        initSocket: () => {
            io.use(sharedSession(session, { autoSave: true }));
            io.on('connection', (socket: socket.Socket) => {
                console.log(`socket with id ${socket.id} connection established`);
                if (socket.handshake.session.userId) {
                    console.log('Welcome back: ' + socket.handshake.session.userId);
                } else {
                    socket.handshake.session.userId = Math.random().toString(36).substring(7) + '-P';
                    socket.handshake.session.save(() => {
                        console.log('Welcome: ' + socket.handshake.session.userId);
                    });
                }
                initHandlers(io, socket)
            })
        }
    };
}*/

export const initSocket = (http: Server, session: RequestHandler) => {
    const io: socket.Server = socket(http);

    io.use(sharedSession(session, { autoSave: true }));
            io.on('connection', (socket: socket.Socket) => {
                console.log(`socket with id ${socket.id} connection established`);
                if (socket.handshake.session.userId) {
                    console.log('Welcome back: ' + socket.handshake.session.userId);
                } else {
                    socket.handshake.session.userId = Math.random().toString(36).substring(7) + '-P';
                    socket.handshake.session.save(() => {
                        console.log('Welcome: ' + socket.handshake.session.userId);
                    });
                }
                initHandlers(io, socket)
            })
}
