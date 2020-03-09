import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeCard from "./components/WelcomeCard";
import Battleground from './components/Battleground';
import Chat from "./components/Chat";
import Game from "./components/Game";
import io from 'socket.io-client';
import SocketContext from './services/SocketProvider';

export interface Room {
  gameId: string,
  exist: boolean,
  started: boolean,
  players: string[]
}


function App() {
  const [room, setRoom] = useState<Room>();
  


  /*var serverIP = "http://localhost:4000";
  if (process.env.NODE_ENV === 'development') {
    serverIP = "http://localhost:3000";
  }*/




  let socket = io({ autoConnect: false });



  useEffect(() => {
    const roomString = window.location.pathname.substr(1);

    fetch("/session")
      .then(() => {
        socket.on('connect', () => {
          console.log('Connected');
        })

        socket.on('joinRp', function (data: Room) {
          if (data.exist) {
            console.log(data);
            setRoom(data);
          } else {
            window.location.href = 'http://localhost:3000';
          }
        })

        if (roomString.length > 1) {
          socket.emit('join', { id: roomString });
        }

        socket.open();
      },
        (error) => {
          console.log(error);
        }
      )

  }, []);

  return (
    <div className="App">
      {<SocketContext.Provider value={socket}>
        {!room && <WelcomeCard />}
        {room && <Game started={room.started} roomId={room.gameId} players={room.players} />}
        <Battleground />
        <Chat />
      </SocketContext.Provider>}
    </div>
  );
}

export default App;
