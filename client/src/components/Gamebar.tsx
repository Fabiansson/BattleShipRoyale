import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const gamebarStyle = {
  backgroundColor: "#E8A656",
  fontFamily: "Arial",
  height: "80px",
  borderRadius: "0px 0px 15px 15px",
};

function Gamebar() {
  return (
    <div style={gamebarStyle}>
        <Grid container spacing={3}>
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