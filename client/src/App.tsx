import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeCard from "./components/WelcomeCard";
import Battleground from './components/Battleground';
import Lobby from "./components/Lobby";
import io from 'socket.io-client';
import SocketContext from './services/SocketProvider';

export interface Room {
  gameId: string,
  started: boolean,
  players: string[]
}


function App() {
  const [room, setRoom] = useState<Room>();
  const [socket, setSocket] = useState<any>(io({autoConnect: false}));

  /*var serverIP = "http://localhost:4000";
  if (process.env.NODE_ENV === 'development') {
    serverIP = "http://localhost:3000";
  }*/

  //let socket = io({ autoConnect: false });

  useEffect(() => {
    const roomString = window.location.pathname.substr(1);

    fetch("/session")
      .then(() => {
        socket.on('connect', () => {
          console.log('Connected');
        })

        socket.on('joinRp', function (data: Room) {
          if (data.gameId != null) {
            console.log(data);
            setRoom(data);
            setSocket(socket);
          } else {
            window.location.href = 'http://localhost:3000';
          }
        })

        if (roomString.length > 1 && !room) {
          socket.emit('join', { gameId: roomString });
        }

        socket.open();
      },
        (error) => {
          console.log(error);
        }
      )
// eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {<SocketContext.Provider value={socket}>
        {!room && <WelcomeCard />}
        {room && !room.started && <Lobby room={room} />}
        {room && room.started && <Battleground/>}
        <Battleground />
      </SocketContext.Provider>}
    </div>
  );
}

export default App;
