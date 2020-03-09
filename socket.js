const redis = require('./redis');

let rooms = {};

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
            socket.emit("chatMessage", msg.msg)
        });
    
        socket.on('open', async function () {
            if (!socket.handshake.session.room) {
                let randomRoomId = Math.random().toString(36).substring(7);
                console.log('Room with ID: ' + randomRoomId + ' got created.');
                this.join(randomRoomId);
    
                //dummy
                rooms[randomRoomId] = [socket.handshake.session.userId];
    
                await redis.setAsync(`room:${randomRoomId}`, socket.handshake.session.userId, 'NX');
                socket.handshake.session.room = randomRoomId;
                socket.handshake.session.save();
    
                io.sockets.in(randomRoomId).emit('joinRp', {
                    roomId: randomRoomId,
                    exist: true,
                    started: rooms[randomRoomId].length >= 4,
                    players: rooms[randomRoomId]
                })
            }
            console.log(rooms);
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