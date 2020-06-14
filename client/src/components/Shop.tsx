import React, { useState, useContext, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import SocketContext from "../services/SocketProvider";
import { Avatar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';


export interface Item {
  id: number,
  name: string,
  desc: string,
  price: number,
  img: string
}

function Shop() {
  const socket = useContext(SocketContext);

  const initialList: Item[] = [];
  const [itemList, setItemList] = useState(initialList);
  const { t, i18n } = useTranslation();

  socket?.on("recieveShopItem", (data: Item[]) => {
    let test = [...data];
    setItemList([...data]);
    console.log([...data]);
  });

  useEffect(() => {
    socket?.emit("getItemList");
  }, []);

  const sendItem = (itemId: number) => {
    socket?.emit("buy", itemId);
  }

  const listOfItem = itemList.map(item => {
    return (
      <Grid>
        <ListItem>
          <ListItemAvatar>
            <Avatar variant="square" sizes="big" alt="Picture" src={item.img} />
          </ListItemAvatar>
          <Grid item xs={8}>
            <ListItemText
              primary={t(item.name)}
              secondary={t(item.desc)}
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemText
              primary={item.price}
            />
          </Grid>
          <ListItemSecondaryAction>
            <Button variant="contained" color="primary" onClick={() => { sendItem(item.id) }}>
            {t('Buy')}
                </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </Grid>

    );
  })
  return (
    <div>
      <Paper elevation={3}>
        <h1>Shop</h1>
        <List>
          {listOfItem}
        </List>
      </Paper>
    </div>
  )
}

export default Shop;