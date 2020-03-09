import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import frame from "../assets/frame.svg";
import ship from "../assets/ship.svg";
import SocketContext from '../services/SocketProvider';


const useStyles = makeStyles({
  card: {
    maxWidth: 675,
    minHeight: 600,
    backgroundImage: `url(${frame})`,
    backgroundColor: "#282c34",
    backgroundSize: "700px 600px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "50px",
    textAlign: "center"   

  },
  title: {
    marginTop: "70px",
    fontSize:20,
    fontWeight: "bold"
  },
  shipstyle: {
    height:"150px"
  },
  button: {
    backgroundColor: "#56BAE8"
  }
});


function WelcomeCard(props: any) {
  const classes = useStyles();

  const joinGame = () => {
    console.log("join");  
  }

  const hostGame = () => {
    props.socket.emit('open');   
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} >
          Welcome to BattleShipRoyal
        </Typography>
      </CardContent>
      <CardActions>
      <Grid container spacing={3}>
          <Grid item xs={12}>
      <Button variant="contained" className={classes.button} onClick={joinGame}>Join Game</Button>
      </Grid>
      <Grid item xs={12}>
      <Button id="join" variant="contained" color="primary" onClick={hostGame}>Host Game</Button>
      </Grid>
      <Grid item xs={12}>
      <img src={ship} alt="our ship" className={classes.shipstyle} />
      </Grid>
      </Grid>
     
      </CardActions>
    </Card>
  );
}

const WelcomeCardWithSocket = (props: any) => (
  <SocketContext.Consumer>
      {(socket: any) => <WelcomeCard {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default WelcomeCardWithSocket;