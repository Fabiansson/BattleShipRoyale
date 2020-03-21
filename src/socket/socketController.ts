import { Server, Socket, Rooms } from 'socket.io';

import * as game from '../services/gameService';
import { ChatMessage, JoinResponse, GeneralGameState, JoinRequest, ErrorResponse, GameSettings } from 'interfaces/interfaces';

export const initHandlers = (io: Server, socket: Socket) => {
    socket.on('disconnect', () => {
        console.log(`Socket with id ${socket.id} disconnected.`);
    })

    socket.on("chatMessage", function (msg: ChatMessage) {
        console.log('chat ' + msg.msg);
        let sender = socket.handshake.session.userId;
        let payload: ChatMessage = {
            sender: sender,
            msg: msg.msg,
        }
        socket.emit("chatMessage", Object.assign(payload, { owner: true }));
        socket.to(socket.handshake.session.room).emit("chatMessage", Object.assign(payload, { owner: false }));
    });

    socket.on('open', async function () {
        if (!socket.handshake.session.room) {
            let generalGameState: GeneralGameState = await game.initGame(socket);
            console.log('Room with ID: ' + generalGameState.gameId + ' got created.');
            socket.join(generalGameState.gameId);

            socket.handshake.session.room = generalGameState.gameId;
            socket.handshake.session.save(() => {
                let response: JoinResponse = {
                    gameId: generalGameState.gameId,
                    started: generalGameState.started,
                    players: generalGameState.players,
                    playerNames: generalGameState.playerNames
                }
                io.sockets.in(generalGameState.gameId).emit('joinRp', generalGameState);
            });
        }
    });

    socket.on('join', async function (data: JoinRequest) {
        console.log('Trying to join room with id: ' + data.gameId);
        if (!io.nsps['/'].adapter.rooms[data.gameId]) { return console.error(new Error('ROOM_DOES_NOT_EXIST')); }
        try {
            let generalGameState: GeneralGameState = await game.join(data.gameId, socket, true);
            console.log('Found matching room to join');
            socket.join(data.gameId);

            socket.handshake.session.room = generalGameState.gameId;
            socket.handshake.session.save(() => {
                let response: JoinResponse = {
                    gameId: generalGameState.gameId,
                    started: generalGameState.started,
                    players: generalGameState.players,
                    playerNames: generalGameState.playerNames
                }
                return io.sockets.in(data.gameId).emit('joinRp', generalGameState);
            });
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 1,
                error: 'Joining room failed.'
            }
            socket.emit('error', response);
        }
    })

    socket.on('findGame', async function () {
        console.log('Trying to find a game...');
        let socketRooms: Rooms = io.nsps['/'].adapter.rooms;
        for (let socketRoom in socketRooms) {
            let members: string[] = Object.keys(io.nsps['/'].adapter.rooms[socketRoom].sockets);

            if (members.length < 4 && socketRoom.length < 10) {
                console.log('FOUND A ROOM...' + socketRoom);
                try {
                    let generalGameState: GeneralGameState = await game.join(socketRoom, socket, false);
                    console.log('Found matching room to join');
                    socket.join(socketRoom);

                    socket.handshake.session.room = generalGameState.gameId;
                    socket.handshake.session.save(() => {
                        let response: JoinResponse = {
                            gameId: generalGameState.gameId,
                            started: generalGameState.started,
                            players: generalGameState.players,
                            playerNames: generalGameState.playerNames
                        }
                        return io.sockets.in(socketRoom).emit('joinRp', generalGameState);
                    }); 
                } catch (e) {
                    //TODO: Retry if failed
                    console.error(e);
                    let response: ErrorResponse = {
                        errorId: 2,
                        error: 'Finding room failed.'
                    }
                    socket.emit('error', response);
                }
            }
        }

    })

    socket.on('gameSettings', async (data: GameSettings) => {
        console.log('Changing game Settings')
        const userId = socket.handshake.session.userId;
        const gameId = socket.handshake.session.room;
        if(userId && gameId) {
            try {
                let generalGameState: GeneralGameState = await game.changeSettings(data, userId, gameId);
                console.log('GameSettings changed.')

                return io.sockets.in(generalGameState.gameId).emit('generalGameStateUpdate', generalGameState);
            } catch(e) {
                console.error(e);
                let response: ErrorResponse = {
                    errorId: 3,
                    error: 'Could not change Game Settings.'
                }
                socket.emit('error', response);
            }
        }
        
    })
}

