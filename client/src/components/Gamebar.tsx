import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const gamebarStyle = {
  backgroundColor: '#525252',
    opacity: '0.8',
    color: 'white',
  height: '100%'
};

function Gamebar() {
  return (
    <div style={gamebarStyle}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
      <h1>BattleshipRoyale</h1>
      </Grid>
      <Grid item xs={4}>
      <p>Runde: </p>
      </Grid>
      <Grid item xs={4}>
        <p>Coins: </p>
      </Grid>
      </Grid>
    </div>);
}

export default Gamebar;