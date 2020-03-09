const redis = require('./redis');

let rooms = {};

function initGame(socket) {
    return new Promise(async function (resolve, reject) {
        let randomRoomId = Math.random().toString(36).substring(7);
        //rooms[randomRoomId] = [socket.handshake.session.userId];

        let generalGameState = {
            gameId: randomRoomId,
            players: [socket.handshake.session.userId],
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
        console.log('beforee');
        await redis.setAsync(`room:${randomRoomId}`, JSON.stringify(generalGameState));
        console.log('after');

        resolve(randomRoomId);
    })

}

module.exports = {
    initGame
}