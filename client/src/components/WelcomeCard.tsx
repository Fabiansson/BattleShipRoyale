import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import frame from "../assets/frame.svg";
import ship from "../assets/ship.svg";
import logo from "../assets/logo.svg";
import SocketContext from '../services/SocketProvider';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  paper: {
    maxWidth: 675,
    minHeight: 600,
    backgroundImage: `url(${frame})`,
    backgroundColor: 'transparent',
    backgroundSize: "700px 600px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "120px",
    textAlign: "center",

  },
  title: {
    marginTop: "70px",
    fontSize:20,
    fontWeight: "bold"
  },
  shipstyle: {
    height:"100px"
  },
  logostyle: {
    marginTop: "70px",
    height:"150px"
  },
  button: {
    backgroundColor: "#56BAE8"
  }
});


function WelcomeCard(props: any) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const joinGame = () => {
    props.socket.emit('findGame');
  }

  const hostGame = () => {
    props.socket.emit('open');   
  }

  const translate = (lang: string) =>{
    i18n.changeLanguage(lang);
  }

  return (
    <div>
      <div className="languageButton">
      <nav id="languageBar">
    <Button  variant="contained" color="primary" onClick={() => translate('de')}>Deutsch</Button>
    <Button  variant="contained" color="primary" onClick={() => translate('en')}>English</Button>
    </nav>
    </div>
    <Paper elevation={0} className={classes.paper} >
 
      <Grid container spacing={3}>
      <Grid item xs={12}>
      <img src={logo} alt="our logo" className={classes.logostyle} />
      </Grid>
          <Grid item xs={12}>
      <Button variant="contained" className={classes.button} onClick={joinGame}>{t('Join')}</Button>
      </Grid>
      <Grid item xs={12}>
      <Button id="join" variant="contained" color="primary" onClick={hostGame}>{t('Host')}</Button>
      </Grid>
      <Grid item xs={12}>
      <img src={ship} alt="our ship" className={classes.shipstyle} />
      </Grid>
      </Grid>

    </Paper>
    </div>
  );
}

const WelcomeCardWithSocket = (props: any) => (
  <SocketContext.Consumer>
      {(socket: any) => <WelcomeCard {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default WelcomeCardWithSocket;
