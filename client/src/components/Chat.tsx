import React, { useState } from "react";
import io from 'socket.io-client';

function Chat() {
  const [roomError, setRoomError] = useState(false);
  const room = window.location.pathname.substr(1);

  let socket = io('http://localhost:4000');

  if (room.length > 1) {
    socket.on('checkRoomResponse', function (data: any) {
      if (data.ok) {
        socket = io('http://localhost:4000/' + room);
      } else {
        setRoomError(true);
      }
    })
    socket.emit('checkRoomId', { id: room });

  } else {
    socket.on('roomCreated', function (data: any) {
      console.log(data.id);
      window.location.href = "http://localhost:3000/" + data.id;
    })
    socket.emit('open');

  }

  socket.on('message', function (data: any) {
    console.log(data.msg);
  })

  return (
    <div>
      <p>Room: {room}</p>
      {roomError && <p>This room does not exist.</p>}
    </div>);
}

export default Chat;