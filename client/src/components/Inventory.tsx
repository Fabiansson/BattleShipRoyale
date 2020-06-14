import React from 'react';
import { PlayerGameState } from "../App";
import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import { useTranslation } from 'react-i18next';

interface InventoryProps {
  playerGameState: PlayerGameState,

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inventory: {
      backgroundColor: '#525252',
      opacity: '0.8',
      color: 'white',
      height: '100%',
    },
    titel: {
      margin: "10px",

    },
  }),
);


function Inventory(props: InventoryProps) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  return (
    <div className={classes.inventory}>
      <h2 className={classes.titel}>{t('Inventory')}</h2>
      <Grid>
        <Grid item xs={7}>
          <ul>
            {props.playerGameState.inventory.map(item => {
              return (
                <li><span>{item.name}</span>
                </li>);
            })}
          </ul>
        </Grid>
      </Grid>
    </div>);
}

export default Inventory;