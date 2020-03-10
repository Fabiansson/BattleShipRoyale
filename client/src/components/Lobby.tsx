import React from "react";
import SocketContext from '../services/SocketProvider';
import {createStyles, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Room} from "../App";
import Chat from "./Chat";

export interface LobbyProps {
    room: Room;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            width: '80%',
            marginTop: '300px',
            marginRight: '0'
        }
    }),
);

function Lobby(props: LobbyProps) {
    const classes = useStyles();
    //const [playerList, setPlayerList] = useState<Player[]>([]);



    return (
        <React.Fragment>
            <ul>
                {props.room.players.map((player, i) => <li key={i}>{player}</li>)}
            </ul>
            Invite Link: <a href={'http://localhost:3000/' + props.room.gameId}>{'http://localhost:3000/' + props.room.gameId}</a>
            <Chat/>
        </React.Fragment>
    );
}

const LobbyWithSocket = (props: any) => (
    <SocketContext.Consumer>
        {(socket: any) => <Lobby {...props} socket={socket}/>}
    </SocketContext.Consumer>
)

export default LobbyWithSocket;
