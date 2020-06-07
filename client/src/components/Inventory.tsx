import React, { useContext} from 'react';
import SocketContext from "../services/SocketProvider";
import { PlayerGameState } from "../App";
import Button from '@material-ui/core/Button';


interface InventoryProps {
    playerGameState: PlayerGameState;
}

const inventoryStyle = {
    backgroundColor: '#525252',
    opacity: '0.8',
    color: 'white',
    height: '100%', 
};

function Inventory(props: InventoryProps) {

    const socket = useContext(SocketContext);
    const takeItem = (itemId: number) => {

        socket?.emit("use", itemId);
      }

    return (
    <div style={inventoryStyle}>
        <h2>INVENTORY</h2>
        <ul>
              {props.playerGameState.inventory.map(item => {
                  return(
                <li><span>{item.name}:</span> {item.amount}
                  <Button variant="contained" color="primary" onClick={()=>takeItem(item.itemId)}>
                    Use Item
                </Button>
                  </li>);
})}
           
            </ul>
    </div>);
}

export default Inventory;