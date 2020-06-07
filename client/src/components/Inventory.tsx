import React from 'react';
import { PlayerGameState } from "../App";
import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

interface InventoryProps {
    playerGameState: PlayerGameState,
    
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inventory: {
          backgroundColor: '#525252',
          opacity: '0.8',
          color: 'white',
          height: '100%',
        },
        titel: {
            margin: "10px",

        },
    }),
);


function Inventory(props: InventoryProps) {
    const classes = useStyles();

    return (
    <div className={classes.inventory}>
        <h2 className={classes.titel}>INVENTORY</h2>
        <Grid>
          <Grid item xs={7}>
        <ul>
              {props.playerGameState.inventory.map(item => {
                  return(
                <li><span>{item.name}</span>
                  </li>);
})}       
            </ul>
            </Grid>
            <Grid item xs={5}> 

            <ul>
              {props.playerGameState.ships.map(item => {
                  return(
                <li><span>bullets per ship: {item.shotsOrMoves}: </span>
 
                  </li>);
})}       
            </ul>

            </Grid>
            </Grid>
    </div>);
}

export default Inventory;