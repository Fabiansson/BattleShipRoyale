import React from "react";
import SocketContext from '../services/SocketProvider';

export interface GameProps {
    open: boolean,
    roomId: string,
    players: [],
    socket: any
  }

export interface Player {
    playerId: string[],
  }

function Game(props: GameProps) {
    //const [playerList, setPlayerList] = useState<Player[]>([]);

    return (
        <React.Fragment>
            <p>In game!</p>
            <ul>
                {props.players.map((player, i) => <li key={i}>{player}</li>)}
            </ul>
            Invite Link: <a href={'http://localhost:3000/' + props.roomId}>{'http://localhost:3000/' + props.roomId}</a>
        </React.Fragment>
    );
}

const GameWithSocket = (props: any) => (
    <SocketContext.Consumer>
        {(socket: any) => <Game {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default GameWithSocket;