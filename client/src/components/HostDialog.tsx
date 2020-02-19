import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

export interface DialogProps {
    open: boolean;
  }

function HostDialog(props: DialogProps) {
      
 return(
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
            <DialogActions>
            <TextField
          id="outlined-read-only-input"
          defaultValue="...."
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
          </DialogContentText>
        </DialogContent>
      </Dialog>
     </div>
 );
}
export default HostDialog;