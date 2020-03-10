const redis = require('./redis');
const game = require('./game');


function initSocket(io) {
    io.on('connection', function (socket) {
        console.log(`socket with id ${socket.id} connection established`);
        if (socket.handshake.session.userId) {
            console.log('Welcome back: ' + socket.handshake.session.userId);
        } else {
            socket.handshake.session.userId = Math.random().toString(36).substring(7) + '-P';
            socket.handshake.session.save();
            console.log('Welcome: ' + socket.handshake.session.userId);
        }

        socket.on('disconnect', () => {
            console.log(`Socket with id ${socket.id} disconnected.`);
        })

        socket.on("chatMessage", function (msg) {
            console.log('chat ' + msg.msg);
            let sender = socket.handshake.session.userId;
            let payload = {
                sender: sender,
                msg: msg.msg,
            }
            socket.emit("chatMessage", Object.assign(payload, {owner: true}));
            socket.to(socket.handshake.session.room).emit("chatMessage", Object.assign(payload, {owner: false}));
        });

        socket.on('open', async function () {
            if (!socket.handshake.session.room) {
                let generalGameState = await game.initGame(socket);
                console.log('Room with ID: ' + generalGameState.gameId + ' got created.');
                socket.join(generalGameState.gameId);
                socket.emit('roomChange');

                socket.handshake.session.room = generalGameState.gameId;
                socket.handshake.session.save();

                io.sockets.in(generalGameState.gameId).emit('joinRp', {
                    gameId: generalGameState.gameId,
                    started: generalGameState.started,
                    players: generalGameState.players,
                    playerNames: generalGameState.playerNames
                });
            }
        });

        socket.on('join', async function (data) {
            console.log('Trying to join room with id: ' + data.gameId);
            if (!io.nsps['/'].adapter.rooms[data.gameId]) { return console.error(new Error('ROOM_DOES_NOT_EXIST')); }
            try {
                let generalGameState = await game.join(data.gameId, socket);
                console.log('Found matching room to join');
                socket.join(data.gameId);

                socket.handshake.session.room = generalGameState.gameId;
                socket.handshake.session.save();

                return io.sockets.in(data.gameId).emit('joinRp', {
                    gameId: generalGameState.gameId,
                    startet: generalGameState.started,
                    players: generalGameState.players,
                    playerNames: generalGameState.playerNames
                });
            } catch (e) {
                console.error(e);
                socket.emit('joinRp', {
                    gameId: null,
                    started: false,
                    players: []
                });
            }
        })

        socket.on('findGame', async function () {
            console.log('Trying to find a game...');
            let socketRooms = io.nsps['/'].adapter.rooms;
            for (let socketRoom in socketRooms) {
                let members = Object.keys(io.nsps['/'].adapter.rooms[socketRoom].sockets);

                if(members.length < 4 && socketRoom.length < 10) {
                    console.log('FOUND A ROOM...' + socketRoom);
                    try {
                        let generalGameState = await game.join(socketRoom, socket);
                        console.log('Found matching room to join');
                        socket.join(socketRoom);

                        socket.handshake.session.room = generalGameState.gameId;
                        socket.handshake.session.save();

                        return io.sockets.in(socketRoom).emit('joinRp', {
                            gameId: generalGameState.gameId,
                            startet: generalGameState.started,
                            players: generalGameState.players,
                            playerNames: generalGameState.playerNames
                        });
                    } catch (e) {
                        //TODO: Retry if failed
                        console.error(e);
                        socket.emit('joinRp', {
                            gameId: null,
                            started: false,
                            players: []
                        });
                    }
                }
            }

        })
    });
}

module.exports = {
    initSocket
}
