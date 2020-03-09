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
            socket.broadcast.emit("chatMessage", Object.assign(payload, {owner: false}));
            
        });
    
        socket.on('open', async function () {
            if (!socket.handshake.session.room) {
                let gameId = await game.initGame(socket);
                console.log('Room with ID: ' + gameId + ' got created.');
                this.join(gameId);
    
                
                
                socket.handshake.session.room = gameId;
                socket.handshake.session.save();

                let generalGameState = JSON.parse(await redis.getAsync(`room:${gameId}`));
    
                io.sockets.in(gameId).emit('joinRp', {
                    roomId: gameId,
                    exist: true,
                    started: generalGameState.started,//rooms[randomRoomId].length >= 4, //OR EVEN FALSE
                    players: generalGameState.players//rooms[randomRoomId]
                })
            }
        });
    
        socket.on('join', function (data) {
            console.log('tryin to join room with id: ' + data.id);
            if (io.nsps['/'].adapter.rooms[data.id] && !rooms[data.id].includes(socket.handshake.session.userId)) {
                console.log('found matching room to join');
                rooms[data.id] = [...rooms[data.id], socket.handshake.session.userId]
                this.join(data.id);
                let players = rooms[data.id].length;
                io.sockets.in(data.id).emit('joinRp', {
                    roomId: data.id,
                    exist: true,
                    startet: players >= 4,
                    players: rooms[data.id]
                });
                console.log(rooms);
            } else {
                console.log('no matching room found to join');
                socket.emit('joinRp', {
                    exists: false,
                    started: false,
                    players: []
                });
            }
        })
    });
}

module.exports = {
    initSocket
}