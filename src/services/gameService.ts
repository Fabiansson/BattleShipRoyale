import { redis } from '../redis/redis';
import { GeneralGameState, GameSettings, ServerGameState, PlayerGameState } from 'interfaces/interfaces';
import { Socket } from 'socket.io';

export function initGame(socket: Socket) {
    return new Promise<GeneralGameState>(async function (resolve, reject) {
        let randomRoomId: string = Math.random().toString(36).substring(7);

        let generalGameState: GeneralGameState = {
            gameId: randomRoomId,
            players: [socket.handshake.session.userId],
            playerNames: ['Karl'],
            admin: socket.handshake.session.userId,
            rounds: 5,
            currentRound: null,
            turn: null,
            terrainMap: null,
            fog: null,
            started: false,
            privateLobby: true
        }

        await redis.setAsync(`room:${randomRoomId}`, JSON.stringify({generalGameState}));

        resolve(generalGameState);
    })
}

export function join(gameId: string, socket: Socket, privateLobby: boolean) {
    return new Promise<GeneralGameState>(async function (resolve, reject) {
        let sgs: ServerGameState = JSON.parse(await redis.getAsync(`room:${gameId}`));
        let generalGameState: GeneralGameState = sgs.generalGameState;

        console.log('Room is private: ' + generalGameState.privateLobby);
        console.log('Join Type is private: ' + privateLobby);

        if(generalGameState.privateLobby && !privateLobby) {
            reject(new Error('ROOM_IS_PRIVATE'));
        } else if (generalGameState.players.includes(socket.handshake.session.userId)) { //[NOT] IS FOR DEV ONLY!
            reject(new Error('USER_ALREADY_CONNECTED')); //TODO: Some reconnect functionality
        } else if(!generalGameState.started) {
            generalGameState.players.push(socket.handshake.session.userId);
            generalGameState.playerNames.push('Salvatore');
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

        if(generalGameState.admin === userId && settings.rounds != null && settings.privateLobby != null) {
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

        if(generalGameState.admin === userId && generalGameState.players.length > 0 && !generalGameState.started) {
            generalGameState.started = true;
            generalGameState.currentRound = 1;
            generalGameState.turn = generalGameState.players[Math.floor(Math.random() * generalGameState.players.length)],
            //TODO map.createTerrain();
            generalGameState.terrainMap = [3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
            let playerGameStates: PlayerGameState[] = [];
            for(let player in generalGameState.players) {
                let playerGameState = {playerId: generalGameState.players[player],
                    coins: 0,
                    inventory: [],
                    ships: [{
                        size: 2,
                        xStart: 1,
                        xEnd: 2,
                        yStart: 1,
                        yEnd: 2,
                        shotsOrMoves: 2,
                        health: [1,1]  //[1,1,1] or [0,0,1] for ship with size 3
                      }],
                    hits: [],
                    alive: true}
                playerGameStates.push(playerGameState)
            }

            sgs.playerGameStates = playerGameStates;
            sgs.map = { gameId: generalGameState.gameId,
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
            };

            await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));

            resolve(sgs);
        } else {
            reject(new Error('USER_NOT_ADMIN_OR_NOT_ENOUGH_PLAYERS_OR_GAME_ALREADY_STARTED'));
        }
    })
}