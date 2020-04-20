import { Server, Socket, Rooms } from 'socket.io';

import * as game from '../services/gameService';
import { turnTime } from '../services/gameRuleService';
import { ChatMessage, GeneralGameState, JoinRequest, ErrorResponse, GameSettings, ServerGameState } from 'interfaces/interfaces';

let timer = null;

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
                io.sockets.in(generalGameState.gameId).emit('generalGameStateUpdate', generalGameState);
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
                return io.sockets.in(data.gameId).emit('generalGameStateUpdate', generalGameState);
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
                        return io.sockets.in(socketRoom).emit('generalGameStateUpdate', generalGameState);
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

    function startTurnTimer(gameId: string) {
        if(timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => { endTurn(gameId) }, turnTime); 
    }

    socket.on('startGame', async () => {
        console.log('Starting game...');
        const userId = socket.handshake.session.userId;
        const gameId = socket.handshake.session.room;
        let members: string[] = Object.keys(io.nsps['/'].adapter.rooms[gameId].sockets);
        if(members.length > 0) { //ONLY FOR DEV
            try {
                let serverGameState: ServerGameState = await game.startGame(userId, gameId);
                console.log('Game started...');

                io.sockets.in(serverGameState.generalGameState.gameId).emit('generalGameStateUpdate', serverGameState.generalGameState);
                for(let playerGameState in serverGameState.playerGameStates) {
                    io.to(playerGameState).emit('playerGameStateUpdate', serverGameState.playerGameStates[playerGameState]);
                }
                startTurnTimer(gameId);
                return;
            } catch(e) {
                console.error(e);
                let response: ErrorResponse = {
                    errorId: 4,
                    error: 'Could not start game.'
                }
                socket.emit('error', response);
            }
        }
    })

    async function endTurn(gameIdd?: string){
        console.log('Turn ended.');
        let userId = null;
        let gameId = null;
        if(!gameIdd) {
            userId = socket.handshake.session.userId;
            gameId = socket.handshake.session.room;
        } else {
            gameId = gameIdd;
        }
        try {
            let generalGameState: GeneralGameState = await game.endTurn(gameId, userId);
            if(generalGameState.winner) {
                io.sockets.in(generalGameState.gameId).emit('playerWon');
                return;
            }
            io.sockets.in(generalGameState.gameId).emit('generalGameStateUpdate', generalGameState);
            startTurnTimer(gameId);
            return;
        } catch(e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 5,
                error: 'Could not end turn.'
            }
            socket.emit('error', response);
        }


    }

    socket.on('endTurn', async () => endTurn())
}

