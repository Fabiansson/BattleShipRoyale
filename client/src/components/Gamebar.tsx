import React, { useContext } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SocketContext from '../services/SocketProvider';
import UserContext from '../services/UserProvider';

const gamebarStyle = {
  backgroundColor: '#525252',
    opacity: '0.8',
    color: 'white',
  height: '100%'
};

const endTurnButtonStyle = {
  margin: '1rem'
}

interface GamebarProps {
  round: number,
  amountRounds: number,
  coins: number,
  turn: string
}

function Gamebar(props: GamebarProps) {
  const userId = useContext(UserContext);
  const socket = useContext(SocketContext);

  const endTurn = () => {
    socket?.emit('endTurn');
  }

  return (
    <div style={gamebarStyle}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
      <h1>BattleshipRoyale</h1>
      </Grid>
      <Grid item xs={4}>
        <p>Round: {props.round} / {props.amountRounds}</p>
        <h2>YOUR TURN!!!!!!!</h2>
      </Grid>
      <Grid item xs={2}>
        <p>Coins: {props.coins}</p>
      </Grid>
      <Grid item xs={2}>
      <Button 
        style={endTurnButtonStyle} 
        id="endTurn" 
        variant="contained" 
        color="primary" 
        disabled={props.turn !== userId}
        onClick={endTurn}>End Turn</Button>
      </Grid>
      </Grid>
    </div>);
}

export default Gamebar;