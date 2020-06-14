import React, { useState, useEffect, useContext } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { useSnackbar } from 'notistack';

import SocketContext from '../services/SocketProvider';
import UserContext from '../services/UserProvider';
import Shop from "./Shop";

import { useTranslation } from 'react-i18next';

const gamebarStyle = {
  backgroundColor: '#525252',
  opacity: '0.8',
  color: 'white',
  height: '100%'
};

const endTurnButtonStyle = {
  marginTop: '1rem',
  marginLeft: '1rem'
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
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();


  useEffect(() => {
    if (isMyTurn()) {
      setSeconds(59);
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
    if (seconds === 0) {
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

  const openShop = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={gamebarStyle}>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <h1>BattleshipRoyale</h1>
        </Grid>
        <Grid item xs={4}>
          <p>{t('Round')}: {props.round} / {props.amountRounds}</p>
        </Grid>
        <Grid item xs={1}>
          <p>{t('Coins')}: {props.coins}</p>
        </Grid>
        <Grid item xs={2}>
          {isMyTurn() &&
            <p>{t('Time')}: {seconds}s</p>}
        </Grid>
        <Grid item xs={2}>
          <Button
            style={endTurnButtonStyle}
            id="endTurn"
            variant="contained"
            color="primary"
            disabled={props.turn !== userId}
            onClick={endTurn}>{t('Endturn')}</Button>
          <Button style={endTurnButtonStyle} variant="contained" color="primary" onClick={openShop}>{t('Shop')}</Button>
        </Grid>

      </Grid>

      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
         
        <Shop />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>);
}

export default Gamebar;