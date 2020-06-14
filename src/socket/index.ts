import { RequestHandler } from 'express';
import { Server } from 'http';
import socket from 'socket.io';
import sharedSession from 'express-socket.io-session';
import { initHandlers, setSocket, joinGame } from './socketController';

export const initSocket = (http: Server, session: RequestHandler) => {
    const io: socket.Server = socket(http);

    io.use(sharedSession(session, { autoSave: true }));
    io.on('connection', async (socket: socket.Socket) => {
        console.log(`socket with id ${socket.id} connection established`);
        console.log('SessionId: ' + socket.handshake.session.id);
        console.log('UserId: ' + socket.handshake.session.userId);
        console.log('RoomId: ' + socket.handshake.session.room);

        initHandlers(io, socket);

        if (socket.handshake.session.userId && socket.handshake.session.room) {
            setSocket(socket.handshake.session.userId, socket.id);
            const gameId: string = socket.handshake.session.room;
            const userId = socket.handshake.session.userId;
            console.log('Welcome back: ' + socket.handshake.session.userId);
            socket.emit('userId', socket.handshake.session.userId);
            console.log('Trying to join room with id: ' + gameId);

            joinGame(io, socket, gameId, userId);
        } else {
            const userId: string = Math.random().toString(36).substr(7);
            socket.handshake.session.userId = userId;
            setSocket(userId, socket.id);
            socket.handshake.session.save(() => {
                console.log('Welcome: ' + socket.handshake.session.userId);
                socket.emit('userId', socket.handshake.session.userId);
            });
        }
    })
}