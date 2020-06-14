import { RequestHandler } from 'express';
import { Server } from 'http';
import socket from 'socket.io';
import sharedSession from 'express-socket.io-session';
import { initHandlers } from './socketController';

export const initSocket = (http: Server, session: RequestHandler) => {
    const io: socket.Server = socket(http);

    io.use(sharedSession(session, { autoSave: true }));
            io.on('connection', (socket: socket.Socket) => {
                console.log(`socket with id ${socket.id} connection established`);
                if (socket.handshake.session.userId) {
                    // TODO: Check if user was in room and eventually rejoin
                    console.log('Welcome back: ' + socket.handshake.session.userId);
                    socket.emit('userId', socket.handshake.session.userId);
                } else {
                    socket.handshake.session.userId = socket.id;
                    socket.handshake.session.save(() => {
                        console.log('Welcome: ' + socket.handshake.session.userId);
                        socket.emit('userId', socket.handshake.session.userId);
                    });
                }
                initHandlers(io, socket)
            })
}