import React, { useState } from 'react';
import './App.css';
import WelcomeCard from "./components/WelcomeCard";
import Battleground from './components/Battleground';
import Chat from "./components/Chat";
import io from 'socket.io-client';
import SocketContext from './services/SocketProvider';
import Gamebar from "./components/Gamebar";

function App() {
  const [room, setRoom] = useState('');
  const [roomError, setRoomError] = useState(false);
  const roomString = window.location.pathname.substr(1);
  

  var serverIP = "http://localhost:4000/";
  if(process.env.NODE_ENV === 'development'){
    serverIP = "http://localhost:4000/";
  }

  const [socket, setSocket] = useState(io(serverIP + room));

  //let socket = io(serverIP + room);

  const changeSocket = (address: string) => {
    setSocket(io(address));
  }

  if (roomString.length > 1) {
    socket.on('checkRoomResponse', function (data: any) {
      if (data.ok) {
        setRoom(roomString);
        setSocket(io(serverIP + roomString));
      } else {
        setRoomError(true);
      }
    })
    socket.emit('checkRoomId', { id: roomString });
  }

  

  return (
    <div className="App">
     <SocketContext.Provider value={socket}>
     <Gamebar />
      {!roomError && !(room.length > 1) && <WelcomeCard setSocket={changeSocket} open={false}/>}
      {roomError && <p>This room doesent exist!</p>}
      {!roomError && (room.length > 1) && <p>Welcome to room with ID: {room}</p>}
      <Battleground />
      <Chat />
      </SocketContext.Provider>
    </div>
  );
}

export default App;
