import React, { useState, useEffect } from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import WelcomeCard from "./components/WelcomeCard";
import Lobby from "./components/Lobby";
import io from 'socket.io-client';
import SocketContext from './services/SocketProvider';
import UserContext from './services/UserProvider';
import Game from './components/Game';

export interface Room {
  gameId: string,
  started: boolean,
  players: string[]
}

export interface ErrorResponse {
  errorId?: number,
  error: string
}

export interface InventoryItem {
  itemId: number,
  amount: number
}

export interface Ship {
  shotsOrMoves: number,
  position: ShipBlock[]
}

export interface ShipBlock {
  x: number,
  y: number,
  health: number
}

export interface HitCoordinates {
  x: number,
  y: number,
  hit: boolean
}

export interface PlayerGameState {
  coins: number,
  inventory: InventoryItem[],
  ships: Ship[],
  hits: HitCoordinates[],
  alive: boolean,
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
  players: Player[],
  admin: string,
  rounds: number,
  currentRound?: number
  turn?: Player,
  terrainMap?: number[],
  fog?: Fog,
  started: boolean,
  privateLobby: boolean
}

export interface Player {
  playerId: string,
  playerName: string
}


function App() {
  const [generalGameState, setGeneralGameState] = useState<GeneralGameState | null>(null);
  const [playerGameState, setPlayerGameState] = useState<PlayerGameState | null>(null);
  const [socket, setSocket] = useState<SocketIOClient.Socket>(io({ autoConnect: false }));
  const [userId, setuUserId] = useState<string>('');

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Indie Flower',
        'Arial'
      ].join(','),
    },
  });

  useEffect(() => {
    const roomString = window.location.pathname.substr(1);

    fetch("/session")
      .then(() => {
        socket.on('userId', (userId: string) => {
          console.log('UserId: ' + userId);
          setuUserId(userId);
        })

        socket.on('generalGameStateUpdate', function (data: GeneralGameState) {
          console.log(data);
          setGeneralGameState(data);
          setSocket(socket);
        })

        socket.on('playerGameStateUpdate', function(data: PlayerGameState) {
          console.log(data);
          setPlayerGameState(data);
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
      <ThemeProvider theme={theme}>
      {<UserContext.Provider value={userId}>
        <SocketContext.Provider value={socket}>
        {!generalGameState && <WelcomeCard />}
        {generalGameState && !generalGameState.started && <Lobby generalGameState={generalGameState} />}
        {generalGameState && generalGameState.started && generalGameState.terrainMap && playerGameState &&
          <Game generalGameState={generalGameState} playerGameState={playerGameState}/>}
      </SocketContext.Provider>
      </UserContext.Provider>}
      </ThemeProvider>
    </div>
  );
}

export default App;
