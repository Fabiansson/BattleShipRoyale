import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
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

export interface Item {
  id: number,
  name: string,
  desc: string,
  price: number,
  img: string
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

export interface Hit {
  x: number,
  y: number,
}

export interface PlayerGameState {
  coins: number,
  inventory: Item[],
  ships: Ship[],
  hits: Hit[],
  alive: boolean,
}

export interface Fog {
  radius: number,
  xCenter: number,
  yCenter: number,
  nextRadius: number,
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
  lootMap?: number[],
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
  const { enqueueSnackbar } = useSnackbar();

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

        socket.on('playerGameStateUpdate', function (data: PlayerGameState) {
          console.log(data);
          setPlayerGameState(data);
        })

        socket.on('info', function (data: string) {
          enqueueSnackbar(data, {
            variant: 'info',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
          }
          })
        })

        socket.on('error', function (data: string) {
          console.log(data);
          switch (data) {
            case '':
              window.location.href = 'http://localhost:3000'
              break;
            default:
              enqueueSnackbar(data, {
                variant: 'error',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
              }
              });
          }
        })

        socket.on('youLost', () => {
          enqueueSnackbar('HAHAHAHAHAHAH YOU LOST!!!! NOOOB!!', {
            variant: 'info',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
          }
          })
        })

        socket.on('playerWon', (data: Player) => {
          enqueueSnackbar(data.playerName + 'won! Congratulations!', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
          }
          });
          
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
