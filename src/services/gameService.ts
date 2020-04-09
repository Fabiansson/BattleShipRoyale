import { redis } from '../redis/redis';
import { GeneralGameState, GameSettings, ServerGameState, PlayerGameState, Player } from 'interfaces/interfaces';
import { Socket } from 'socket.io';

let timer = null;

export function initGame(socket: Socket) {
    return new Promise<GeneralGameState>(async function (resolve, reject) {
        let randomRoomId: string = Math.random().toString(36).substring(7);

        let generalGameState: GeneralGameState = {
            gameId: randomRoomId,
            players: [{ playerId: socket.handshake.session.userId, playerName: 'Karl' }],
            admin: socket.handshake.session.userId,
            rounds: 5,
            currentRound: null,
            turn: null,
            terrainMap: null,
            fog: null,
            started: false,
            privateLobby: true
        }

        let playerGameStates = {};

        await redis.setAsync(`room:${randomRoomId}`, JSON.stringify({ generalGameState, playerGameStates }));

        resolve(generalGameState);
    })
}

export function join(gameId: string, socket: Socket, privateLobby: boolean) {
    return new Promise<GeneralGameState>(async function (resolve, reject) {
        let sgs: ServerGameState = JSON.parse(await redis.getAsync(`room:${gameId}`));
        let generalGameState: GeneralGameState = sgs.generalGameState;

        console.log('Room is private: ' + generalGameState.privateLobby);
        console.log('Join Type is private: ' + privateLobby);

        if (generalGameState.privateLobby && !privateLobby) {
            reject(new Error('ROOM_IS_PRIVATE'));
        } else if (generalGameState.players.includes(socket.handshake.session.userId)) { //[NOT] IS FOR DEV ONLY!
            reject(new Error('USER_ALREADY_CONNECTED')); //TODO: Some reconnect functionality
        } else if (!generalGameState.started) {
            let player: Player = {
                playerId: socket.handshake.session.userId,
                playerName: 'Salvatore'
            }
            generalGameState.players.push(player);
            await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));
            resolve(generalGameState);
        } else {
            reject(new Error('GAME_ALREADY_STARTED'));
        }
    })
}

export function changeSettings(settings: GameSettings, userId: string, gameId: string) {
    return new Promise<GeneralGameState>(async function (resolve, reject) {
        let sgs: ServerGameState = JSON.parse(await redis.getAsync(`room:${gameId}`));
        let generalGameState: GeneralGameState = sgs.generalGameState;

        if (generalGameState.admin === userId && settings.rounds != null && settings.privateLobby != null) {
            generalGameState.rounds = settings.rounds;
            generalGameState.privateLobby = settings.privateLobby;

            await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));

            resolve(generalGameState);
        } else {
            reject(new Error('USER_NOT_ADMIN_OR_SETTINGS_WRONG'));
        }
    })
}

export function startGame(userId: string, gameId: string) {
    return new Promise<ServerGameState>(async function (resolve, reject) {
        let sgs: ServerGameState = JSON.parse(await redis.getAsync(`room:${gameId}`));
        let generalGameState: GeneralGameState = sgs.generalGameState;

        if (generalGameState.admin === userId && generalGameState.players.length > 0 && !generalGameState.started) {
            generalGameState.started = true;
            generalGameState.currentRound = 1;
            generalGameState.turn = generalGameState.players[Math.floor(Math.random() * generalGameState.players.length)],
                //TODO map.createTerrain();
                generalGameState.terrainMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
                    0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
                    0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //TODO: map.createFog();
            generalGameState.fog = {
                radius: 100,
                xCenter: 4,
                yCenter: 4,
                nextXCenter: 4 + 2,
                nextYCenter: 4 - 1
            }

            for (let player in generalGameState.players) {
                let playerGameState: PlayerGameState = {
                    coins: 0,
                    inventory: [],
                    ships: [{
                        shotsOrMoves: 2,
                        position: [{ x: 1, y: 1, health: 100 }, { x: 1, y: 2, health: 100 }]
                    }],
                    hits: [],
                    alive: true
                }

                sgs.playerGameStates[generalGameState.players[player].playerId] = playerGameState;
            }

            /*sgs.map = { gameId: generalGameState.gameId,
                map: [[0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''],
            [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''],
            [0,''], [0,''], [5,'a'], [5,'a'], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''],
            [5,'b'], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''],
            [5,'b'], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''],
            [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''],
            [0,''], [0,''], [0,''], [0,''], [5,'c'], [5,'c'], [0,''], [0,''], [0,''], [0,''],
            [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''],
            [5,'d'], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''],
            [5,'d'], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,''], [0,'']]
            };*/

            await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));

            resolve(sgs);
        } else {
            reject(new Error('USER_NOT_ADMIN_OR_NOT_ENOUGH_PLAYERS_OR_GAME_ALREADY_STARTED'));
        }
    })
}

export function endTurn(gameId: string, userId?: string) {
    return new Promise<GeneralGameState>(async function (resolve, reject) {
        let sgs: ServerGameState = JSON.parse(await redis.getAsync(`room:${gameId}`));
        let generalGameState: GeneralGameState = sgs.generalGameState;

        if (userId && generalGameState.turn.playerId !== userId) {
            reject(new Error('NOT_USERS_TURN'));
            return;
        }

        const oldIndex: number = generalGameState.players.map((e) => { return e.playerId }).indexOf(generalGameState.turn.playerId);
        let nextPlayer: Player = null;
        let currentIndex: number = generalGameState.players.map((e) => { return e.playerId }).indexOf(generalGameState.turn.playerId);
        while (true) {
            const nextIndex: number = (currentIndex + 1) % generalGameState.players.length;
            currentIndex = nextIndex;
            if (currentIndex === oldIndex) {
                break;
            }
            nextPlayer = generalGameState.players[nextIndex];
            if (sgs.playerGameStates[nextPlayer.playerId].alive) {
                generalGameState.turn = nextPlayer;
                await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));
                resolve(generalGameState);
                return;
            }
        }

        if (generalGameState.currentRound + 1 > generalGameState.rounds) {
            generalGameState.winner = generalGameState.players[oldIndex];
            generalGameState.turn = null;
        } else {
            generalGameState.currentRound++;
        }

        await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));
        resolve(generalGameState);

    })
}