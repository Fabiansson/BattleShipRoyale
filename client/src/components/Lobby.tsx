import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import SocketContext from '../services/SocketProvider';
import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GeneralGameState } from "../App";
import Chat from "./Chat";

export interface LobbyProps {
    generalGameState: GeneralGameState;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            paddingInlineStart: '0'
        },
        avatar: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        playerListElement: {
            float: 'left',
            listStyleType: 'none'
        }
    }),
);

function Lobby(props: LobbyProps) {
    const classes = useStyles();
    //const [playerList, setPlayerList] = useState<Player[]>([]);
    const [privateLobby, setPrivateLobby] = useState(true);
    const [roundOption, setRoundOption] = useState(5);

    const handlePrivateChange = () => {
        setPrivateLobby(!privateLobby);
    }

    const handleRoundOptionChange = (event: any) => {
        setRoundOption(event.target.value);
    }

    const startGame = () => {
        console.log('startgame');
    }

    return (
        <React.Fragment>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={6}>
                    <Paper elevation={3} style={{ padding: '3em' }}>
                        Invite Link: <a href={'http://localhost:3000/' + props.generalGameState.gameId}>{'http://localhost:3000/' + props.generalGameState.gameId}</a>
                        <Grid container spacing={2}>
                            {true &&
                                <Grid item xs={6}>
                                    <h2>Settings</h2>
                                    <FormControl variant="outlined" >
                                        <InputLabel id="demo-simple-select-outlined-label">Rounds</InputLabel>
                                        <Select value={roundOption} onChange={handleRoundOptionChange} label="Rounds">
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={8}>8</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={15}>15</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControlLabel
                                        control={<Switch checked={privateLobby} onChange={handlePrivateChange} name="checkedA" color="primary" />}
                                        label="Private Lobby"
                                        labelPlacement="top"
                                    />
                                </Grid>}
                            <Grid item xs={6}>
                                <h2>Players</h2>
                                <ul className={classes.list}>
                                    {props.generalGameState.players.map((player, i) =>
                                        <li key={i} className={classes.playerListElement}>
                                            <Avatar className={classes.avatar} src={'https://avatars.dicebear.com/v2/avataaars/' + player + 'd.svg'}>{player}</Avatar>
                                        </li>)}
                                </ul>
                            </Grid>

                            {props.generalGameState.players.length >= 2 &&
                                <Grid item xs={12}>
                                    <Button id="join" variant="contained" color="primary" onClick={startGame}>Start</Button>
                                </Grid>}
                            <Grid item xs={12}>
                                <Chat />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>



        </React.Fragment>
    );
}

const LobbyWithSocket = (props: any) => (
    <SocketContext.Consumer>
        {(socket: any) => <Lobby {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default LobbyWithSocket;
