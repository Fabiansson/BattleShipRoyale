import { redis } from '../redis/redis';
import { GeneralGameState, GameSettings, ServerGameState, PlayerGameState, Player, Move, Attack, WarPlayerGameStates, Ship, PlayerGameStateCollection, FogReport } from 'interfaces/interfaces';
import { itemList } from './items';
import { Socket } from 'socket.io';
import { getCoordinates } from '../helpers/helpers';
import { checkMove, resetShotsOrMoves, checkLoot, checkAlive, fogEatsShips } from './gameRuleService';
import { createTerrainMap, placeShips, createFog, shrinkFog } from './mapService';

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
            generalGameState.terrainMap = createTerrainMap(400);
            generalGameState.fog = createFog(400);

            const shipPacks: Ship[][] = placeShips(generalGameState.terrainMap, generalGameState.players.length);

            for (let player in generalGameState.players) {
                let playerGameState: PlayerGameState = {
                    coins: 0,
                    inventory: [],
                    ships: shipPacks.pop(),
                    hits: [],
                    alive: true
                }

                sgs.playerGameStates[generalGameState.players[player].playerId] = playerGameState;
            }

            await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));

            resolve(sgs);
        } else {
            reject(new Error('USER_NOT_ADMIN_OR_NOT_ENOUGH_PLAYERS_OR_GAME_ALREADY_STARTED'));
        }
    })
}

export function endTurn(gameId: string, userId?: string) {
    return new Promise<FogReport>(async function (resolve, reject) {
        let endTurn: FogReport = null;
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
                endTurn = {serverGameState: sgs, playerGameStates: {}}
                resolve(endTurn);
                return;
            }
        }

        //END OF GAME
        if (generalGameState.currentRound + 1 > generalGameState.rounds) {
            generalGameState.winner = generalGameState.players[oldIndex];
            generalGameState.turn = null;
            endTurn = {serverGameState: sgs, playerGameStates: {}}
        } else {
            generalGameState.currentRound++;
            generalGameState.fog = shrinkFog(generalGameState.terrainMap.length, generalGameState.fog);
            endTurn = fogEatsShips(sgs, generalGameState.fog);
            sgs = endTurn.serverGameState;
        }

        await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));
        resolve(endTurn);

    })
}


export function buyItem(gameId: string, userId: string, data: number){

 return new Promise<PlayerGameState>(async function (resolve, reject) {
    let item = itemList.find(itemId => itemId.id === data);
    let costItem = itemList.find(itemId => itemId.id === data).price;
    let sgs: ServerGameState = JSON.parse(await redis.getAsync(`room:${gameId}`));
    let playerGameState: PlayerGameState = sgs.playerGameStates[userId];
    let coinsOfPlayer: number = sgs.playerGameStates[userId].coins;
    if(coinsOfPlayer > costItem){
        reject(new Error("NEED_MORE_COINS"));
        return
    }
    else{
        let resultat: number = playerGameState.coins - costItem
        playerGameState.coins = resultat;

        if(playerGameState.inventory[item.id]) {
            playerGameState.inventory[item.id].amount++;
        } else {
            playerGameState.inventory.push({itemId: item.id, name: item.name ,amount: 1})
        }
        
        sgs.playerGameStates[userId] = playerGameState;
        await redis.setAsync(`room:${gameId}` , JSON.stringify(sgs));
        resolve(playerGameState);
        return
    }
    })
 }
 

export function move(gameId: string, userId: string, move: Move) {
    return new Promise<PlayerGameState>(async function (resolve, reject) {
        let sgs: ServerGameState = JSON.parse(await redis.getAsync(`room:${gameId}`));
        let generalGameState: GeneralGameState = sgs.generalGameState;
        let playerGameState: PlayerGameState = sgs.playerGameStates[userId];

        let mapSize: number = generalGameState.terrainMap.length;
        let fromCoordinates = getCoordinates(mapSize, move.from);

        if (userId && generalGameState.turn.playerId !== userId) {
            reject(new Error('NOT_USERS_TURN'));
            return;
        }

        for (let ship of playerGameState.ships) {
            for (let position of ship.position) {
                if (position.x == fromCoordinates[0] && position.y == fromCoordinates[1]) {
                    for (let position of ship.position) {
                        try{
                            if (checkMove(generalGameState.terrainMap, generalGameState.fog, ship, position, move.to)) {
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
                            }
                        } catch(e) {
                            reject(e);
                            return;
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
                    }
                }
            }
        }

        for (let player in sgs.playerGameStates) {
            for (let ship of sgs.playerGameStates[player].ships) {
                for (let position of ship.position) {
                    if (position.x == toCoordinates[0] && position.y == toCoordinates[1]) {
                        if (position.health > 0) {
                            wpgs.victimId = player;
                            position.health--;
                            playerGameState.coins = playerGameState.coins + 100;
                            sgs.playerGameStates[player].alive = checkAlive(sgs.playerGameStates[player]);

                            wpgs.playerGameStates[player] = sgs.playerGameStates[player];
                            wpgs.attackerMessage = 'You hit a ship!';
                            wpgs.victimMessage = 'One of your ships got hit!';
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

export function loot(gameId: string, userId: string, loot: Attack) {
    return new Promise<PlayerGameState>(async function (resolve, reject) {
        let sgs: ServerGameState = JSON.parse(await redis.getAsync(`room:${gameId}`));
        let generalGameState: GeneralGameState = sgs.generalGameState;
        let playerGameState: PlayerGameState = sgs.playerGameStates[userId];

        let mapSize: number = generalGameState.terrainMap.length;
        let fromCoordinates = getCoordinates(mapSize, loot.from);

        if (userId && generalGameState.turn.playerId !== userId) {
            reject(new Error('NOT_USERS_TURN'));
            return;
        }

        for (let ship of playerGameState.ships) {
            for (let position of ship.position) {
                if (position.x == fromCoordinates[0] && position.y == fromCoordinates[1]) {
                    try {
                        if (checkLoot(generalGameState.terrainMap, generalGameState.fog, ship, position, loot.to)) {
                            ship.shotsOrMoves--;
                            //playerGameState = loot(playerGameState);

                            await redis.setAsync(`room:${gameId}`, JSON.stringify(sgs));
                            resolve(playerGameState);
                            return;
                        }
                    } catch (e) {
                        reject(e);
                        return;
                    }
                }
            }
        }
    })
}

