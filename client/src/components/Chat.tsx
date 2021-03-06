import React, { useEffect, useRef } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import SocketContext from "../services/SocketProvider";
import "../App.css";
import { Player } from "../App";
import { useTranslation } from 'react-i18next';

export interface ChatMessage {
  sender?: Player,
  msg: string,
  owner?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    rootGrid: {
      position: 'relative',
      flexGrow: 1,
      backgroundColor: "#f2f2f2",
      width: '100%',
      height: '100%',
      borderRadius: "15px 15px 15px 15px",
    },
    list: {
      listStyleType: "none",
      display: "inline-block"
    },
    listDiv: {
      height: '90%',
      overflowY: "auto",
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {

        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
        backgroundColor: "#F5F5F5",
        borderRadius: "10px"
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: "10px",
        backgroundImage:
          `-webkit-gradient(linear,
                           left bottom,
                           left top,
                           color-stop(0.44, rgb(122,153,217)),
                           color-stop(0.72, rgb(73,125,189)),
                           color-stop(0.86, rgb(28,58,148)))`
      }
    },
    sender: {
      textAlign: "left",
      fontWeight: "bold"
    },
    inputField: {
      position: 'absolute',
      bottom: 2,
      paddingLeft: 20
    },

  }),
);

function Chat(props: any) {
  const classes = useStyles();
  const { t } = useTranslation();
  const initialList: ChatMessage[] = [];
  const [chatList, setChatList] = React.useState(initialList);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current != null) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

  };
  useEffect(scrollToBottom, [chatList]);

  useEffect(() => {
    props.socket.on("chatMessage", function (payload: ChatMessage) {
      console.log('chatmessagereceived');
      setChatList(chatList => [...chatList, payload]);
    })
    
    var submitText = document.getElementById("submitText");
    submitText?.addEventListener("keydown", function (e: any) {
      if (e != null && e.keyCode === 13) {
        e.preventDefault();
        sendText(e);
      }

    });
    // eslint-disable-next-line
  }, []);

  const sendText = (e: any) => {
    let message: ChatMessage = {
      msg: e.target.value
    }
    props.socket.emit("chatMessage", message);
    e.target.value = "";
  }


  return (
    <div className={classes.rootGrid}>
      <div className={classes.listDiv} id="listDiv">
        <ul className={classes.list}>
          {chatList.map((item, index) => (
            <li style={item.owner ? { color: "blue" } : { color: "black" }}
              key={index}><span className={classes.sender}>{item.sender?.playerName}:</span> {item.msg}</li>
          ))}
        </ul>
        <div ref={messagesEndRef} />
      </div>
      <div className={classes.inputField}>
        <Input id="submitText" placeholder={t("Message")} inputProps={{ 'aria-label': 'description' }} />
      </div>
    </div>
  );
}

const ChatWithSocket = (props: any) => (
  <SocketContext.Consumer>
    {(socket: any) => <Chat {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default ChatWithSocket;
