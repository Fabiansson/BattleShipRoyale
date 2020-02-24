import React, { useState, useEffect} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import SocketContext from '../services/SocketProvider';

export interface DialogProps {
  open: boolean,
  text: string,
  socket: any
}

export interface Player {
  playerName: string,
}

function HostDialog(props: DialogProps) {
  const [playerList, setPlayerList] = useState<Player[]>([]);

  props.socket.on('playerJoined', function(data: Player){
    console.log('player joined');
    let players: Player[] = playerList;
    players.push(data);
    setPlayerList(players)
  })
  
  return (
    <div>

      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Share this Link with your friends!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              
          
              {playerList.map(player => (
      player.playerName
    ))}
            
          
            </DialogContentText>
            <DialogActions>
              <TextField
                id="outlined-read-only-input"
                value={props.text}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <Button
                color="primary"
              >
                next
              </Button>
            </DialogActions>
          
        </DialogContent>
      </Dialog>
    </div>
  );
}

const HostDialogWithSocket = (props: any) => (
  <SocketContext.Consumer>
      {(socket: any) => <HostDialog {...props} socket={socket} />}
  </SocketContext.Consumer>
)
export default HostDialogWithSocket;