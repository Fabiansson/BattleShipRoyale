import React from "react";
import { GeneralGameState, PlayerGameState } from "../App";

const statsStyle = {
    backgroundColor: '#525252',
    opacity: '0.8',
    color: 'white',
    height: '100%'
};

interface GameStatsProps {
    generalGameState: GeneralGameState;
    playerGameState: PlayerGameState;
}

function GameStats(props: GameStatsProps) {

    return (
    <div style={statsStyle}>
        <h2>Opponent Inventory</h2>
        
        <ul>
              {props.generalGameState.players.map(item => {
                  return(
                <li><span>{item.playerName}:</span> <span> {props.playerGameState.ships.length} Ships</span>
                  
                  </li>);
})}
           
            </ul>
    </div>);
}

export default GameStats;