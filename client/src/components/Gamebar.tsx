import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';

function Gamebar() {
  var field = 20;
  var grid = function(field: Number){
    
  }
  return (
    <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
      <Button variant="contained" color="primary" onClick={joinGame}>Join Game</Button>
      </Grid>
      <Grid item xs={12}>
      <Button id="join" variant="contained" color="primary" onClick={hostGame}>Host Game</Button>
      <HostDialog open={open} />
      </Grid>
      <Grid item xs={12}>
      <img src={ship} alt="our ship" className={classes.shipstyle} />
      </Grid>
      </Grid>
    </div>);
}

export default Gamebar;