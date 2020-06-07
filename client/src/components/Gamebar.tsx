import React, { useState, useEffect, useContext } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();
  const [seconds, setSeconds] = useState<number>(0);
  const [timer, setTimer] = useState<any>(null);


  useEffect(() => {
    console.log('turn got changed');
    if (isMyTurn()) {
      console.log('turn is mine');
      setSeconds(29);
      enqueueSnackbar('YOUR TURN', {
        variant: 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        }
      });
      startTimer();
    }
  }, [props.turn])

  useEffect(() => {
    if(seconds === 0) {
      clearInterval(timer);
    }
  }, [seconds])

  const startTimer = () => {
    setTimer(setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000));
  }

  const endTurn = () => {
    socket?.emit('endTurn');
  }

  const isMyTurn = () => {
    return props.turn === userId;
  }

  return (
    <div style={gamebarStyle}>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <h1>BattleshipRoyale</h1>
        </Grid>
        <Grid item xs={4}>
          <p>Round: {props.round} / {props.amountRounds}</p>
        </Grid>
        <Grid item xs={1}>
          <p>Coins: {props.coins}</p>
        </Grid>
        <Grid item xs={2}>
            {isMyTurn() && 
            <p>Time remaining: { seconds }s</p>}
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