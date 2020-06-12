import { Server, Socket, Rooms } from 'socket.io';
import * as game from '../services/gameService';

import { itemList } from '../services/itemService';
import { turnTime } from '../services/gameRuleService';
import { ChatMessage, GeneralGameState, JoinRequest, ErrorResponse, GameSettings, ServerGameState, Move, PlayerGameState, WarPlayerGameStates, Attack, FogReport, LootReport, UseReport, ItemUtilization, Player, JoinReport } from 'interfaces/interfaces';
import { redis } from '../redis/redis';

let timer = null;

export const initHandlers = (io: Server, socket: Socket) => {
    socket.on('disconnect', () => {
        console.log(`Socket with id ${socket.id} disconnected.`);
    })

    socket.on("chatMessage", async function (msg: ChatMessage) {
        console.log('Chat message reveived...');
        const userId = socket.handshake.session.userId;
        const gameId = socket.handshake.session.room;
        let chatMessage: ChatMessage = await game.createChatMessage(userId, gameId, msg.msg);
        
        io.to(socket.id).emit("chatMessage", Object.assign(chatMessage, { owner: true }));
        socket.to(socket.handshake.session.room).emit("chatMessage", Object.assign(chatMessage, { owner: false }));
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
        const userId = socket.handshake.session.userId;

        if (!io.nsps['/'].adapter.rooms[data.gameId]) {
            socket.handshake.session.room = null;
            socket.handshake.session.save(() => {
                console.error(new Error('ROOM_DOES_NOT_EXIST'));
            });

            return;
        }
        try {
            let joinReport: JoinReport = await game.join(data.gameId, userId, true);
            console.log('Found matching room to join');
            socket.join(data.gameId);

            socket.handshake.session.room = joinReport.generalGameState.gameId;
            socket.handshake.session.save(() => {
                io.sockets.in(data.gameId).emit('generalGameStateUpdate', joinReport.generalGameState);
                if(joinReport.playerGameState) {
                    io.to(socket.id).emit('playerGameStateUpdate', joinReport.playerGameState);
                }
                return;
            });
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 1,
                error: e.message
            }
            io.to(socket.id).emit('error', response);
        }
    })

    socket.on('findGame', async function () {
        console.log('Trying to find a game...');
        const userId = socket.handshake.session.userId;
        let socketRooms: Rooms = io.nsps['/'].adapter.rooms;

        for (let socketRoom in socketRooms) {
            let members: string[] = Object.keys(io.nsps['/'].adapter.rooms[socketRoom].sockets);

            if (members.length < 4 && socketRoom.length < 10) {
                console.log('FOUND A ROOM...' + socketRoom);
                try {
                    let joinReport: JoinReport = await game.join(socketRoom, userId, false);
                    console.log('Found matching room to join');
                    socket.join(socketRoom);

                    socket.handshake.session.room = joinReport.generalGameState.gameId;
                    socket.handshake.session.save(() => {
                        return io.sockets.in(socketRoom).emit('generalGameStateUpdate', joinReport.generalGameState);
                    });
                } catch (e) {
                    //TODO: Retry if failed
                    console.error(e);
                    let response: ErrorResponse = {
                        errorId: 2,
                        error: e.message
                    }
                    return io.to(socket.id).emit('error', response);
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
                    error: e.message
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
        if (members.length > 0) { //CHANGE TO 0 FOR DEV
            try {
                let serverGameState: ServerGameState = await game.startGame(userId, gameId);
                console.log('Game started...');
                let members: string[] = Object.keys(io.nsps['/'].adapter.rooms[gameId].sockets);
                console.log(members);

                io.sockets.in(serverGameState.generalGameState.gameId).emit('generalGameStateUpdate', serverGameState.generalGameState);
                for (let playerGameState in serverGameState.playerGameStates) {
                    io.to(await getSocket(playerGameState)).emit('playerGameStateUpdate', serverGameState.playerGameStates[playerGameState]);
                }
                startTurnTimer(gameId);
                return;
            } catch (e) {
                console.error(e);
                let response: ErrorResponse = {
                    errorId: 4,
                    error: e.message
                }
                io.to(socket.id).emit('error', response);
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
            let endTurn: ServerGameState = await game.endTurn(gameId, userId);
            let generalGameState: GeneralGameState = endTurn.generalGameState;
            if(generalGameState.winner) {
                io.sockets.in(generalGameState.gameId).emit('playerWon', generalGameState.winner);
                return;
            }
            for(let player in endTurn.playerGameStates) {
                io.to(await getSocket(player)).emit('playerGameStateUpdate', endTurn.playerGameStates[player]);
                //io.to(player).emit('info', 'One ore more of your ships got destroyed by the fog...');
            }
            io.sockets.in(generalGameState.gameId).emit('generalGameStateUpdate', generalGameState);
            io.sockets.in(generalGameState.gameId).emit('turnTimer');
            startTurnTimer(gameId);
            return;
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 5,
                error: e.message
            }
            io.to(socket.id).emit('error', response);
        }


    }

    socket.on('endTurn', async () => endTurn())

    socket.on('moveTo', async (data: Move) => {
        console.log('Moving ship...');
        const userId = socket.handshake.session.userId;
        const gameId = socket.handshake.session.room;

        try {
            let playerGameState: PlayerGameState = await game.move(gameId, userId, data);
            io.to(socket.id).emit('playerGameStateUpdate', playerGameState);
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 6,
                error: e.message
            }
            io.to(socket.id).emit('error', response);
        }
    })

    socket.on('attack', async (data: Attack) => {
        console.log('Attacking...');
        const userId = socket.handshake.session.userId;
        const gameId = socket.handshake.session.room;

        try {
            let wpgs: WarPlayerGameStates = await game.attack(gameId, userId, data);
            io.to(socket.id).emit('playerGameStateUpdate', wpgs.playerGameStates[wpgs.attackerId]);
            io.to(socket.id).emit('info', wpgs.attackerMessage);
            if (wpgs.victimId) {
                io.to(await getSocket(wpgs.victimId)).emit('playerGameStateUpdate', wpgs.playerGameStates[wpgs.victimId]);
                io.to(await getSocket(wpgs.victimId)).emit('info', wpgs.victimMessage);
                if (!wpgs.playerGameStates[wpgs.victimId].alive) {
                    io.to(await getSocket(wpgs.victimId)).emit('youLost');
                }
            }
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 7,
                error: e.message
            }
            io.to(await getSocket(userId)).emit('error', response);
        }
    })

    socket.on('loot', async (data: Attack) => {
        console.log('Looting...');
        const userId = socket.handshake.session.userId;
        const gameId = socket.handshake.session.room;

        try {
            let lootReport: LootReport = await game.loot(gameId, userId, data);
            io.sockets.in(gameId).emit('generalGameStateUpdate', lootReport.generalGameState);
            io.to(socket.id).emit('playerGameStateUpdate', lootReport.playerGameState);
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 7,
                error: e.message
            }
            io.to(socket.id).emit('error', response);
        }
    })

    socket.on('buy', async (data: number) => {
        console.log('Buying item...');
        const userId = socket.handshake.session.userId;
        const gameId = socket.handshake.session.room;
        try {
            let playerGameState: PlayerGameState = await game.buyItem(gameId, userId, data);
            io.to(socket.id).emit('playerGameStateUpdate', playerGameState);
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 8,
                error: e.message
            }
            io.to(socket.id).emit('error', response);
        }
    })

    socket.on('getItemList', async () => {
        console.log('Requesting itemList...');
        const userId = socket.handshake.session.userId;
        try {
            io.to(socket.id).emit('recieveShopItem', itemList);
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 9,
                error: e.message
            }
            io.to(socket.id).emit('error', response);
        }
    });

    socket.on('use', async (data: ItemUtilization) => {
        console.log('Using item...');
        const userId = socket.handshake.session.userId;
        const gameId = socket.handshake.session.room;

        try {
            let useReport: UseReport = await game.use(gameId, userId, data);
            
            if(useReport.generalGameState) {
                io.sockets.in(gameId).emit('generalGameStateUpdate', useReport.generalGameState);
            }
            
            for(let player in useReport.playerGameStates) {
                io.to(await getSocket(player)).emit('playerGameStateUpdate', useReport.playerGameStates[player]);
            }
        } catch (e) {
            console.error(e);
            let response: ErrorResponse = {
                errorId: 11,
                error: e.message
            }
            io.to(socket.id).emit('error', response);
        }
    })
}

const getSocket = async (userId: string) => {
    try {
        return await redis.getAsync(`userId:${userId}`);
    } catch (e) {
        console.error(e);
        throw new Error('Could not get socket from user');
    }
}

export const setSocket = async (userId: string, socketId: string) => {
    try {
        await redis.setAsync(`userId:${userId}` , socketId);
    } catch (e) {
        console.error(e);
        throw new Error('Could not set socket for user.');
    }
    
}
