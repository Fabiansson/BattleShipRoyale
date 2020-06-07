import React, { useState, useContext, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SocketContext from "../services/SocketProvider";


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

  socket?.on("recieveShopItem", (data: Item[]) => {
    console.log(data);
    let test = [...data];
    console.log(test);
  setItemList([...data]);
 });

useEffect(() => {
  
 socket?.emit("getItemList");
 
}, []);

  const sendItem = (itemId: number) => {

    socket?.emit("buy", itemId);
  }
    
   const listOfItem = itemList.map(item=>{
        return (
          
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="Picture" src="../assets/mine.svg" />                 
                </ListItemAvatar>
                <ListItemText
                  primary={item.desc}
                  secondary={item.price}
                />
                <ListItemSecondaryAction>
                <Button variant="contained" color="primary" onClick={()=>{sendItem(item.id)}}>
                    BUY
                </Button>
                </ListItemSecondaryAction>
              </ListItem>
      
        );
          })
    return(
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