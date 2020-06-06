import { redis } from '../redis/redis';
import { GeneralGameState, GameSettings, ServerGameState, PlayerGameState, Player, Move, Attack, WarPlayerGameStates, Ship } from 'interfaces/interfaces';
import { Socket } from 'socket.io';
import { getCoordinates } from '../helpers/helpers';
import { turnTime, checkMove, resetShotsOrMoves } from './gameRuleService';

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
                        position: [{ x: 1, y: 1, health: 1 }, { x: 1, y: 2, health: 1 }]
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
                sgs = resetShotsOrMoves(sgs);
                await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));
                resolve(generalGameState);
                return;
            }
        }

        //END OF GAME
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

export function move(gameId: string, userId: string, move: Move) {
    return new Promise<PlayerGameState>(async function (resolve, reject) {
        let sgs: ServerGameState = JSON.parse(await redis.getAsync(`room:${gameId}`));
        let generalGameState: GeneralGameState = sgs.generalGameState;
        let playerGameState: PlayerGameState = sgs.playerGameStates[userId];

        let mapSize: number = generalGameState.terrainMap.length;
        let fromCoordinates = getCoordinates(mapSize, move.from);
        //let toCoordinates = getCoordinates(mapSize, move.to);

        if (userId && generalGameState.turn.playerId !== userId) {
            reject(new Error('NOT_USERS_TURN'));
            return;
        }

        for (let ship of playerGameState.ships) {
            for (let position of ship.position) {
                if (position.x == fromCoordinates[0] && position.y == fromCoordinates[1]) {
                    for (let position of ship.position) {
                        if (checkMove(generalGameState.terrainMap, position, move.to)) {
                            if(ship.shotsOrMoves == 0) {
                                reject(new Error('NO_MOVES_LEFT'));
                                return;
                            }
                            switch (move.to) {
                                case 'left':
                                    position.x--;
                                    break;
                                case 'right':
                                    position.x++;
                                    break;
                                case 'up':
                                    position.y--;
                                    break;
                                case 'down':
                                    position.y++;
                                    break;
                            }
                        } else {
                            reject(new Error('NOT_A_POSSIBLE_MOVE'));
                            return
                        }
                    }
                    ship.shotsOrMoves--;
                    sgs.playerGameStates[userId] = playerGameState;
                    await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));
                    resolve(playerGameState);
                    return
                }
            }
        }

        reject(new Error('NO_CORRESPONDING_SHIP_FOUND'));
    })
}

export function attack(gameId: string, userId: string, attack: Attack) {
    return new Promise<WarPlayerGameStates>(async function (resolve, reject) {
        let sgs: ServerGameState = JSON.parse(await redis.getAsync(`room:${gameId}`));
        let generalGameState: GeneralGameState = sgs.generalGameState;
        let playerGameState: PlayerGameState = sgs.playerGameStates[userId];

        let wpgs: WarPlayerGameStates = {
            attackerId: userId,
            victimId: null,
            playerGameStates: {

            },
            attackerMessage: null,
            victimMessage: null
        }

        let mapSize: number = generalGameState.terrainMap.length;
        let fromCoordinates = getCoordinates(mapSize, attack.from);
        let toCoordinates = getCoordinates(mapSize, attack.to);

        if (userId && generalGameState.turn.playerId !== userId) {
            reject(new Error('NOT_USERS_TURN'));
            return;
        }

        for (let ship of playerGameState.ships) {
            for (let position of ship.position) {
                if (position.x == fromCoordinates[0] && position.y == fromCoordinates[1]) {
                    if (position.health == 0 || ship.shotsOrMoves == 0) {
                        reject(new Error('SHIP_IS_DOWN_OR_HAS_NO_SHOTS_OR_MOVES'));
                        return;
                    } else {
                        ship.shotsOrMoves--;
                        wpgs.playerGameStates[userId] = playerGameState;
                        console.log('Attacking ship is: ' + ship + ' attacking block is: ' + position);
                    }
                }
            }
        }

        for (let player in sgs.playerGameStates) {
            for (let ship of sgs.playerGameStates[player].ships) {
                for (let position of ship.position) {
                    if (position.x == toCoordinates[0] && position.y == toCoordinates[1]) {
                        console.log('ship found');
                        if (position.health > 0) {
                            wpgs.victimId = player;
                            position.health--;
                            playerGameState.coins = playerGameState.coins + 100;
                            wpgs.playerGameStates[player] = sgs.playerGameStates[player];
                            wpgs.attackerMessage = 'You hit a ship!';
                            wpgs.victimMessage = 'One of your ships got hit!';
                            console.log('Ship damaged or destroyed');
                            await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));
                            resolve(wpgs);
                            return;
                        }
                    }
                }
            }
        }
        console.log('Shot in the water...');
        wpgs.attackerMessage = 'That was a miss!';
        await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));
        resolve(wpgs);
    })
}
