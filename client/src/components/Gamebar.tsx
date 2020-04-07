import React from "react";
import Grid from '@material-ui/core/Grid';

const gamebarStyle = {
  backgroundColor: '#525252',
    opacity: '0.8',
    color: 'white',
  height: '100%'
};

interface GamebarProps {
  round: number
  coins: number
}

function Gamebar(props: GamebarProps) {
  return (
    <div style={gamebarStyle}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
      <h1>BattleshipRoyale</h1>
      </Grid>
      <Grid item xs={4}>
        <p>Round: {props.round}</p>
      </Grid>
      <Grid item xs={4}>
        <p>Coins: {props.coins}</p>
      </Grid>
      </Grid>
    </div>);
}

export default Gamebar;