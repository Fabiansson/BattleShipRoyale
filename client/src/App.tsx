import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeCard from "./components/WelcomeCard";
import Lobby from "./components/Lobby";
import io from 'socket.io-client';
import SocketContext from './services/SocketProvider';
import Battleground from './components/Battleground';

export interface Room {
  gameId: string,
  started: boolean,
  players: string[]
}

export interface ErrorResponse {
  errorId?: number,
  error: string
}

export interface Fog {
  radius: number,
  xCenter: number,
  yCenter: number,
  nextXCenter: number,
  nextYCenter: number
}

export interface GeneralGameState {
  gameId: string,
  players: string[],
  playerNames: string[],
  admin: string,
  turn?: string,
  terrainMap?: number[],
  fog?: Fog,
  started: boolean
}


function App() {
  const [generalGameState, setGeneralGameState] = useState<GeneralGameState>();
  const [socket, setSocket] = useState<any>(io({ autoConnect: false }));

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

        socket.on('joinRp', function (data: GeneralGameState) {
          console.log(data);
          setGeneralGameState(generalGameState);
          setSocket(socket);
        })

        socket.on('error', function (data: ErrorResponse) {
          switch (data.errorId) {
            case 1:
              window.location.href = 'http://localhost:3000'
              break;
            default:
              console.log('An error occured');
          }
        })

        if (roomString.length > 1 && !generalGameState) {
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
        {!generalGameState && <WelcomeCard />}
        {generalGameState && !generalGameState.started && <Lobby generalGameState={generalGameState} />}
        {generalGameState && generalGameState.started && <Battleground />}
        {/*<Battleground />*/}
      </SocketContext.Provider>}
    </div>
  );
}

export default App;
