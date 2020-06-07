import React, { useContext } from 'react';
import SocketContext from "../services/SocketProvider";
import { PlayerGameState } from "../App";
import Button from '@material-ui/core/Button';

interface InventoryProps {
    playerGameState: PlayerGameState,
    
}

const inventoryStyle = {
    backgroundColor: '#525252',
    opacity: '0.8',
    color: 'white',
    height: '100%', 
};




function Inventory(props: InventoryProps) {
    return (
    <div style={inventoryStyle}>
        <h2>INVENTORY</h2>
        <ul>
              {props.playerGameState.inventory.map(item => {
                  return(
                <li><span>{item.name}</span>
                  </li>);
})}
           
            </ul>
    </div>);
}

export default Inventory;