import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import SocketContext from "../services/SocketProvider";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootForm: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        //width: 200,
        backgroundColor: "white",
      },
    },
    rootGrid: {
      flexGrow: 1,
      backgroundColor: "white",
      width: 300,
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        //width: 200,
        backgroundColor: "white",
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      elevation: 3,
    },
  }),
);

function Chat(props: any) {
  const classes = useStyles();
  const initialList: string[] = [];
  const [chatList, setChatList] = React.useState(initialList);

  useEffect(() =>{
    props.socket.on("chatMessage", function(msg: string){
      let newMessages: string[] = chatList;
      newMessages.push(msg); 
      setChatList(newMessages);

    })
    var submitText = document.getElementById("submitText");
    submitText?.addEventListener("keydown", function(e) {
      if(e != null && e.keyCode === 13){
        e.preventDefault();
        sendText(e);
      }
      
    });
  });

  const sendText = (e: any) => {
    console.log(e.target.value);
    props.socket.emit("chatMessage", {msg: e.target.value});
   
    e.target.value = "";
  }

  return (
      <div className={classes.rootGrid}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="standard-multiline-static"
              multiline
              value={chatList}
              InputProps={{
              readOnly: true,
              }}
            />
          <ul>
          {chatList.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>

          </Grid>
          <Grid item xs={12}>
            <Input id="submitText"  placeholder="Message" inputProps={{ 'aria-label': 'description' }} />
          </Grid>
        </Grid>
      </div>

  );
}

const ChatWithSocket = (props: any) =>{
  <SocketContext.Consumer>
    {(socket: any) => <Chat {...props} socket={socket} />}
  </SocketContext.Consumer>
}

export default ChatWithSocket;