import React, { useState, useContext } from "react";
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
import UserContext from '../services/UserProvider';
import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GeneralGameState } from "../App";
import Chat from "./Chat";

export interface LobbyProps {
    generalGameState: GeneralGameState;
}

export interface GameSettings {
    privateLobby: boolean,
    rounds: number
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
    let initialGameSettings: GameSettings = {
        privateLobby: true,
        rounds: 5
    }
    const [gameSettings, setGameSettings] = useState<GameSettings>(initialGameSettings);
    const userId = useContext(UserContext);
    const socket = useContext(SocketContext);

    const handlePrivateChange = () => {
        let newGameSettings: GameSettings = { ...gameSettings, privateLobby: !gameSettings.privateLobby };
        setGameSettings(newGameSettings);
        socket?.emit('gameSettings', newGameSettings);
    }

    const handleRoundOptionChange = (event: any) => {
        let newGameSettings: GameSettings = { ...gameSettings, rounds: event.target.value };
        setGameSettings(newGameSettings);
        socket?.emit('gameSettings', newGameSettings);
    }

    const startGame = () => {
        socket?.emit('startGame');
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
                            {props.generalGameState.admin === userId &&
                                <Grid item xs={6}>
                                    <h2>Settings</h2>
                                    <FormControl variant="outlined" >
                                        <InputLabel id="demo-simple-select-outlined-label">Rounds</InputLabel>
                                        <Select value={gameSettings.rounds} onChange={handleRoundOptionChange} label="Rounds">
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={8}>8</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={15}>15</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControlLabel
                                        control={<Switch checked={gameSettings.privateLobby} onChange={handlePrivateChange} name="PrivateLobby" color="primary" />}
                                        label="Private Lobby"
                                        labelPlacement="top"
                                    />
                                </Grid>}
                            <Grid item xs={6}>
                                <h2>Players</h2>
                                <ul className={classes.list}>
                                    {props.generalGameState.playerNames.map((player, i) =>
                                        <li key={i} className={classes.playerListElement}>
                                            <div style={{textAlign: 'center'}}><Avatar className={classes.avatar} src={'https://avatars.dicebear.com/v2/avataaars/' + player + 'd.svg'}>{player}</Avatar>
                                            <p>{player}</p></div>
                                            
                                        </li>)}
                                </ul>
                            </Grid>
                            {props.generalGameState.players.length >= 1 && props.generalGameState.admin === userId &&
                                <Grid item xs={12}>
                                    <Button id="startButton" variant="contained" color="primary" onClick={startGame}>Start</Button>
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

export default Lobby;
