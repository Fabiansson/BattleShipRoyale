import { redis } from '../redis/redis';

export function initGame(socket) {
    return new Promise(async function (resolve, reject) {
        let randomRoomId = Math.random().toString(36).substring(7);

        let generalGameState = {
            gameId: randomRoomId,
            players: [socket.handshake.session.userId],
            playerNames: ['Karl'],
            admin: socket.handshake.session.userId,
            turn: socket.handshake.session.userId,
            generalMap: [0, 1, 0, 3, 2, 0, 1, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0],
            fog: {
                radius: 200,
                xCenter: 0,
                yCenter: 0,
                nextXCenter: 0,
                nextYCenter: 0
            },
            started: false
        }

        await redis.setAsync(`room:${randomRoomId}`, JSON.stringify(generalGameState));

        resolve(generalGameState);
    })

}

export function join(gameId, socket) {
    return new Promise(async function (resolve, reject) {
        let generalGameState = JSON.parse(await redis.getAsync(`room:${gameId}`));

        if (generalGameState.players.includes(socket.handshake.session.userId)) { //[NOT] IS FOR DEV ONLY!
            reject(new Error('USER_ALREADY_CONNECTED')); //TODO: Some reconnect functionality
        } else if(!generalGameState.started) {
            generalGameState.players.push(socket.handshake.session.userId);
            generalGameState.playerNames.push('Salvatore');
            await redis.setAsync(`room:${gameId}`, JSON.stringify(generalGameState));
            resolve(generalGameState);
        } else {
            reject(new Error('GAME_ALREADY_STARTED'));
        }
    })

}
