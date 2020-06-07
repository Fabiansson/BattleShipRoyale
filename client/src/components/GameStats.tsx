import React from "react";
import { GeneralGameState, PlayerGameState } from "../App";
import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gameStatsStyle: {
            backgroundColor: '#525252',
            opacity: '0.8',
            color: 'white',
            height: '100%'
        },
        titel: {
            margin: "10px",

        },

    }),
);

interface GameStatsProps {
    generalGameState: GeneralGameState;
    playerGameState: PlayerGameState;
}

function GameStats(props: GameStatsProps) {
    const classes = useStyles();
    return (
    <div className={classes.gameStatsStyle}>
        <h2 className={classes.titel}>Ships</h2>
        
        <ul>
              {props.generalGameState.players.map(item => {
                  return(
                <li style={props.generalGameState.turn ? { color: "white" } : { color: "blue" }}><span>{item.playerName}:</span> <span> {props.playerGameState.ships.length} Ships</span>
                  
                  </li>);
})}
           
            </ul>
    </div>);
}

export default GameStats;