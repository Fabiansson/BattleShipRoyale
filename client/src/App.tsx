import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeCard from "./components/WelcomeCard";
import Battleground from './components/Battleground';
import Chat from "./components/Chat";
import HostDialog from "./components//HostDialog";
import io from 'socket.io-client';
import SocketContext from './services/SocketProvider';

function App() {
  const [room, setRoom] = useState('');
  const [roomError, setRoomError] = useState(false);
  const roomString = window.location.pathname.substr(1);
  

  var serverIP = "http://localhost:4000/";
  if(process.env.NODE_ENV === 'development'){
    serverIP = "http://localhost:4000/";
  }

  let socket = io(serverIP + room);

  if (roomString.length > 1) {
    socket.on('checkRoomResponse', function (data: any) {
      if (data.ok) {
        setRoom(roomString);
      } else {
        setRoomError(true);
      }
    })
    
  }

  useEffect(() => {
    if(roomString.length > 1) {
      socket.emit('join', { id: roomString });
    }
    
  });

  

  

  return (
    <div className="App">
     <SocketContext.Provider value={socket}>
      {!roomError && !(roomString.length > 1) && <WelcomeCard open={false}/>}
      {roomError && <p>This room doesent exist!</p>}
      {!roomError && (roomString.length > 1) && <HostDialog open={true} text={roomString}/>}
      <Battleground />
      <Chat />
      </SocketContext.Provider>
    </div>
  );
}

export default App;
