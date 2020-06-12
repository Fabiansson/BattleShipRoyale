import { RequestHandler } from 'express';
import { Server } from 'http';
import socket from 'socket.io';
import sharedSession from 'express-socket.io-session';
import { initHandlers, setSocket } from './socketController';
import { join } from '../services/gameService';
import { JoinReport, ErrorResponse } from 'interfaces/interfaces';

export const initSocket = (http: Server, session: RequestHandler) => {
    const io: socket.Server = socket(http);

    io.use(sharedSession(session, { autoSave: true }));
    io.on('connection', async (socket: socket.Socket) => {
        console.log(`socket with id ${socket.id} connection established`);
        console.log('SessionId: ' + socket.handshake.session.id);
        console.log('UserId: ' + socket.handshake.session.userId);
        console.log('RoomId: ' + socket.handshake.session.room);
        if (socket.handshake.session.userId && socket.handshake.session.room) {
            setSocket(socket.handshake.session.userId, socket.id);
            const gameId: string = socket.handshake.session.room;
            const userId = socket.handshake.session.userId;
            console.log('Welcome back: ' + socket.handshake.session.userId);
            socket.emit('userId', socket.handshake.session.userId);
            console.log('Trying to join room with id: ' + gameId);

            if (!io.nsps['/'].adapter.rooms[gameId]) {
                //socket.join(gameId);
                socket.handshake.session.room = null;
                socket.handshake.session.save(() => {
                    console.error(new Error('ROOM_DOES_NOT_EXIST'));
                });
                initHandlers(io, socket);
                return;
            }
            try {
                let joinReport: JoinReport = await join(gameId, userId, true);
                socket.join(gameId);
                io.sockets.in(gameId).emit('generalGameStateUpdate', joinReport.generalGameState);
                if (joinReport.playerGameState) {
                    io.to(socket.id).emit('playerGameStateUpdate', joinReport.playerGameState);
                }
            } catch (e) {
                console.error(e);
                let response: ErrorResponse = {
                    errorId: 1,
                    error: e.message
                }
                socket.emit('error', response);
            }
        } else {
            const userId: string = Math.random().toString(36).substr(7);
            socket.handshake.session.userId = userId;
            setSocket(userId, socket.id);
            socket.handshake.session.save(() => {
                console.log('Welcome: ' + socket.handshake.session.userId);
                socket.emit('userId', socket.handshake.session.userId);
            });
        }
        initHandlers(io, socket)
    })
}