import React from "react";
import { GeneralGameState, PlayerGameState, Ship } from "../App";
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

    const countAliveShips = (ships: Ship[]) => {
        let aliveShips: number  = 0;
        ships.forEach(ship => {
            if(shipIsAlive(ship)){
                aliveShips++;
            }
        })
        return aliveShips;
    }

    const shipIsAlive = (ship: Ship) => {
        for(let position of ship.position) {
            if (position.health === 0) {
                return false;
            }
        }
        return true;
    }

    return (
    <div className={classes.gameStatsStyle}>
        <h2 className={classes.titel}>Ships</h2>  
        <ul>
              {props.generalGameState.players.map(item => {
                  return(
                <li style={props.generalGameState.turn ? { color: "white" } : { color: "blue" }}><span>{item.playerName}:</span> <span> {countAliveShips(props.playerGameState.ships)
                } Ships</span>     
                  </li>);
})}     
            </ul>
    </div>);
}

export default GameStats;