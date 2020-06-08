import React from "react";
import Grid from '@material-ui/core/Grid';

import { GeneralGameState, PlayerGameState } from "../App";

import Gamebar from './Gamebar';
import TwoDBattleground from './TwoDBattleground';
import Chat from './Chat';
import Inventory from './Inventory';
import GameStats from "./GameStats";
import Shop from "./Shop";


interface GameProps {
    generalGameState: GeneralGameState,
    playerGameState: PlayerGameState
}

function Game(props: GameProps) {

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item style={{height: '10vh'}} xs={12}>
                    <Gamebar round={props.generalGameState.currentRound!} amountRounds={props.generalGameState.rounds} coins={props.playerGameState.coins} turn={props.generalGameState.turn?.playerId!}/>
                </Grid>
                <Grid item xs={10}>
                    <TwoDBattleground terrain={props.generalGameState.terrainMap!} lootMap={props.generalGameState.lootMap!} fog={props.generalGameState.fog!} ships={props.playerGameState.ships} hits={props.playerGameState.hits} inventory={props.playerGameState.inventory} />

                </Grid>
                <Grid item xs={2} style={{height: '70vh'}}>
                    <Chat />
                </Grid>
                <Grid item xs={12} style={{height: '20vh'}}>
                    <Inventory playerGameState={props.playerGameState}/>
                </Grid>
                {/*<Grid item xs={4} style={{height: '20vh'}}>
                    <GameStats playerGameState={props.playerGameState} generalGameState={props.generalGameState}/>
    </Grid>*/}
            </Grid>
        </div>
    );
}

export default Game;