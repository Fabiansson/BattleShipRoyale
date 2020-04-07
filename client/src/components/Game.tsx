import React from "react";
import Grid from '@material-ui/core/Grid';
import { GeneralGameState, PlayerGameState } from "../App";

import Gamebar from './Gamebar';
import TwoDBattleground from './TwoDBattleground';
import Chat from './Chat';
import Inventory from './Inventory';
import GameStats from "./GameStats";


interface GameProps {
    generalGameState: GeneralGameState,
    playerGameState: PlayerGameState
}

function Game(props: GameProps) {

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item style={{height: '10vh'}} xs={12}>
                    <Gamebar round={props.generalGameState.currentRound!} coins={props.playerGameState.coins}/>
                </Grid>
                <Grid item xs={10} style={{height: '70vh'}}>
                    <TwoDBattleground terrain={props.generalGameState.terrainMap!} ships={props.playerGameState.ships} hits={props.playerGameState.hits} />}
                </Grid>
                <Grid item xs={2} style={{height: '70vh'}}>
                    <Chat />
                </Grid>
                <Grid item xs={8} style={{height: '20vh'}}>
                    <Inventory />
                </Grid>
                <Grid item xs={4} style={{height: '20vh'}}>
                    <GameStats />
                </Grid>
            </Grid>
        </div>
    );
}

export default Game;