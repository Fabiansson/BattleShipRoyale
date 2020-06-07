import { Server, Socket, Rooms } from 'socket.io';
import * as game from '../services/gameService';

import { itemList } from '../services/items';
import { turnTime, resetShotsOrMoves } from '../services/gameRuleService';
import { ChatMessage, GeneralGameState, JoinRequest, ErrorResponse, GameSettings, ServerGameState, Move, PlayerGameState, WarPlayerGameStates, Attack } from 'interfaces/interfaces';

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
        if (userId && gameId) {
            try {
                let generalGameState: GeneralGameState = await game.changeSettings(data, userId, gameId);
                console.log('GameSettings changed.')

                return io.sockets.in(generalGameState.gameId).emit('generalGameStateUpdate', generalGameState);
            } catch (e) {
                console.error(e);
                let response: ErrorResponse = {
                    errorId: 3,
                    error: 'Could not change Game Settings.'
                }
                io.to(userId).emit('error', response);
            }
        }

    })

    function startTurnTimer(gameId: string) {
        if (timer !== null) {
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
        if (members.length > 0) { //ONLY FOR DEV
            try {
                let serverGameState: ServerGameState = await game.startGame(userId, gameId);
                console.log('Game started...');

                io.sockets.in(serverGameState.generalGameState.gameId).emit('generalGameStateUpdate', serverGameState.generalGameState);
                for (let playerGameState in serverGameState.playerGameStates) {
                    io.to(playerGameState).emit('playerGameStateUpdate', serverGameState.playerGameStates[playerGameState]);
                }
                startTurnTimer(gameId);
                return;
            } catch (e) {
                console.error(e);
                let response: ErrorResponse = {
                    errorId: 4,
                    error: 'Could not start game.'
                }
                io.to(userId).emit('error', response);
            }
        }
    })

    async function endTurn(gameIdd?: string) {
        console.log('Turn ended.');
        let userId = null;
        let gameId = null;
        if (!gameIdd) {
            userId = socket.handshake.session.userId;
            gameId = socket.handshake.session.room;
        } else {
            gameId = gameIdd;
        }
        try {
            let generalGameState: GeneralGameState = await game.endTurn(gameId, userId);
            if (generalGameState.winner) {
                io.sockets.in(generalGameState.gameId).emit('playerWon');
                return;
            }
            io.sockets.in(generalGameState.gameId).emit('generalGameStateUpdate', generalGameState);
            io.sockets.in(generalGameState.gameId).emit('turnTimer');
            startTurnTimer(gameId);
            return;
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 5,
                error: 'Could not end turn.'
            }
            io.to(userId).emit('error', response);
        }


    }

    socket.on('endTurn', async () => endTurn())

    socket.on('moveTo', async (data: Move) => {
        console.log('Moving ship...');
        const userId = socket.handshake.session.userId;
        const gameId = socket.handshake.session.room;

        try {
            let playerGameState: PlayerGameState = await game.move(gameId, userId, data);
            io.to(userId).emit('playerGameStateUpdate', playerGameState);
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 6,
                error: 'Could not move ship.'
            }
            io.to(userId).emit('error', response);
        }
    })

    socket.on('attack', async (data: Attack) => {
        console.log('Attacking...');
        const userId = socket.handshake.session.userId;
        const gameId = socket.handshake.session.room;

        try {
            let wpgs: WarPlayerGameStates = await game.attack(gameId, userId, data);
            io.to(userId).emit('playerGameStateUpdate', wpgs.playerGameStates[wpgs.attackerId]);
            io.to(userId).emit('info', wpgs.attackerMessage);
            if (wpgs.victimId) {
                io.to(wpgs.victimId).emit('playerGameStateUpdate', wpgs.playerGameStates[wpgs.victimId]);
                io.to(wpgs.victimId).emit('info', wpgs.victimMessage);
                if (!wpgs.playerGameStates[wpgs.victimId].alive) {
                    io.to(wpgs.victimId).emit('youLost');
                }
            }
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 7,
                error: 'Could not attack target.'
            }
            io.to(userId).emit('error', response);
        }
    })

    socket.on('loot', async (data: Attack) => {
        console.log('Looting...');
        const userId = socket.handshake.session.userId;
        const gameId = socket.handshake.session.room;

        try {
            let playerGameState: PlayerGameState = await game.loot(gameId, userId, data);
            io.to(userId).emit('playerGameStateUpdate', playerGameState);
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 7,
                error: 'Could not loot.'
            }
            io.to(userId).emit('error', response);
        }
    })

    socket.on('buy', async (data: number) => {
        console.log(data);
        const userId = socket.handshake.session.userId;
        const gameId = socket.handshake.session.room;
        try {
            let playerGameState: PlayerGameState = await game.buyItem(gameId, userId, data);
            io.to(userId).emit('playerGameStateUpdate', playerGameState);
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 8,
                error: "Could not buy Item."
            }
            socket.emit('error', response);
        }

    })

    socket.on("getItemList", () => {
        console.log("item ok");
        const userId = socket.handshake.session.userId;
        try {
            io.to(userId).emit('recieveShopItem', itemList);
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 9,
                error: "Could not send Item."
            }
            socket.emit('error', response);
        }
    });
}
