# BattleShipRoyale API documentation
Event driven Socket.IO documenatation for BattleShipRoyale.

## Channels
<a name="channel-createRoom"></a>
###  `subscribe` open
Opens new game session for players.

###### Example of payload _(generated)_

```json
{
  [empty]
}
```
###  `subscribe` findGame
Player requesting to join a random game.

###### Example of payload _(generated)_

```json
{
 [empty]
}
```

###  `subscribe` gameSettings
Changes game Settings before it starts.
##### Payload

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody> 
<tr>
  <td>privateLobby</td>
  <td>boolean</td>
  <td><p>If lobby is private or free to join.</p>
</td>
  <td><em>Any</em></td>
</tr>  
<tr>
  <td>rounds </td>
  <td>number</td>
  <td><p>How many rounds should be played.</p>
</td>
  <td><em>Any</em></td>
</tr> 

  </tbody>
</table>

###### Example of payload _(generated)_

```json
{
  "playerId": "Oi87oqw",
  "playerName": "Peter",
  "roomId": "I8652d"
}
```

###  `subscribe` join
Joins an existing game.
##### Payload

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody> 
<tr>
  <td>gameId </td>
  <td>string</td>
  <td><p>ID of game to join.</p>
</td>
  <td><em>Any</em></td>
</tr>  
  </tbody>
</table>
###### Example of payload _(generated)_

```json
{
  "gameId": "string",
}
```


###  `subscribe` leaveRoom
Leaves currently attending game.








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>playerId </td>
  <td>string</td>
  <td><p>ID of leaving player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>playerName </td>
  <td>string</td>
  <td><p>Name of leaving player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>roomId </td>
  <td>string</td>
  <td><p>ID of room to be left.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "playerId": "string",
  "playerName": "string",
  "roomId": "string"
}
```








<a name="channel-shoot"></a>








###  `subscribe` shoot

(Game Event) Shooting from ship to target.








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>playerId </td>
  <td>string</td>
  <td><p>ID of shooting player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>playerName </td>
  <td>string</td>
  <td><p>Name of shooting player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>roomId </td>
  <td>string</td>
  <td><p>ID of attending game room.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>bulletType </td>
  <td>integer</td>
  <td><p>Type of bullet.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>originField </td>
  <td>object</td>
  <td></td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>originField.xCoordinate </td>
  <td>integer</td>
  <td><p>X-Coordinate of origin.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>originField.yCoordinate </td>
  <td>integer</td>
  <td><p>Y-Coordinate of origin.</p>
</td>
  <td><em>Any</em></td>
</tr>











    
      
<tr>
  <td>targetField </td>
  <td>object</td>
  <td></td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>targetField.xCoordinate </td>
  <td>integer</td>
  <td><p>X-Coordinate of target.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>targetField.yCoordinate </td>
  <td>integer</td>
  <td><p>Y-Coordinate of target.</p>
</td>
  <td><em>Any</em></td>
</tr>











    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "playerId": "string",
  "playerName": "string",
  "roomId": "string",
  "bulletType": 0,
  "originField": {
    "xCoordinate": 0,
    "yCoordinate": 0
  },
  "targetField": {
    "xCoordinate": 0,
    "yCoordinate": 0
  }
}
```








<a name="channel-move"></a>








###  `subscribe` move

(Game Event) Moving with a ship.








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>playerId </td>
  <td>string</td>
  <td><p>ID of moving player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>playerName </td>
  <td>string</td>
  <td><p>Name of moving player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>roomId </td>
  <td>string</td>
  <td><p>ID of attending game room.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>originField </td>
  <td>object</td>
  <td></td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>originField.xCoordinate </td>
  <td>integer</td>
  <td><p>X-Coordinate of origin.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>originField.yCoordinate </td>
  <td>integer</td>
  <td><p>Y-Coordinate of origin.</p>
</td>
  <td><em>Any</em></td>
</tr>











    
      
<tr>
  <td>targetField </td>
  <td>object</td>
  <td></td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>targetField.xCoordinate </td>
  <td>integer</td>
  <td><p>X-Coordinate of target.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>targetField.yCoordinate </td>
  <td>integer</td>
  <td><p>Y-Coordinate of target.</p>
</td>
  <td><em>Any</em></td>
</tr>











    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "playerId": "string",
  "playerName": "string",
  "roomId": "string",
  "originField": {
    "xCoordinate": 0,
    "yCoordinate": 0
  },
  "targetField": {
    "xCoordinate": 0,
    "yCoordinate": 0
  }
}
```








<a name="channel-loot"></a>








###  `subscribe` loot
(Game Event) Looting at specific location.








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>playerId </td>
  <td>string</td>
  <td><p>ID of looting player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>playerName </td>
  <td>string</td>
  <td><p>Name of looting player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>roomId </td>
  <td>string</td>
  <td><p>ID of attending game room.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>lootingField </td>
  <td>object</td>
  <td></td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>lootingField.xCoordinate </td>
  <td>integer</td>
  <td><p>X-Coordinate of field to loot.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>lootingField.yCoordinate </td>
  <td>integer</td>
  <td><p>Y-Coordinate of field to loot.</p>
</td>
  <td><em>Any</em></td>
</tr>











    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "playerId": "string",
  "playerName": "string",
  "roomId": "string",
  "lootingField": {
    "xCoordinate": 0,
    "yCoordinate": 0
  }
}
```








<a name="channel-buy"></a>







###  `subscribe` buy

(Game Event) Buying a specific item.








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>playerId </td>
  <td>string</td>
  <td><p>ID of buying player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>playerName </td>
  <td>string</td>
  <td><p>Name of buying player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>roomId </td>
  <td>string</td>
  <td><p>ID of attending game room.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>itemId </td>
  <td>integer</td>
  <td><p>ID of item to buy.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "playerId": "string",
  "playerName": "string",
  "roomId": "string",
  "itemId": 0
}
```








<a name="channel-chatMessage"></a>
###  `subscribe` chatMessage
Player sends a chat message.
##### Payload
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>      
<tr>
  <td>message </td>
  <td>string</td>
  <td><p>Message sent.</p>
</td>
  <td><em>Any</em></td>
</tr> 
  </tbody>
</table>
###### Example of payload _(generated)_

```json
{
  "message": "string",
}
```

<a name="channel-userId"></a>
###  `publish` userId
Response of a connection for sending unique player information.
##### Payload
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>      
<tr>
  <td>userId </td>
  <td>string</td>
  <td><p>The userId that belongs to the newly connected user.</p>
</td>
  <td><em>Any</em></td>
</tr> 
    <tr>
  <td>playerName </td>
  <td>string</td>
  <td><p>The player name that belongs to the newly connected user.</p>
</td>
  <td><em>Any</em></td>
</tr> 
  </tbody>
</table>
###### Example of payload _(generated)_

```json
{
  "userId": "ozudzw7",
  "playerName": "Paul"
}
```



<a name="channel-createRoomRp"></a>
###  `publish` createRoomRp

Response of createRoom-Event.








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>playerId </td>
  <td>string</td>
  <td><p>ID under which the player will be known.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>playerName </td>
  <td>string</td>
  <td><p>Name under which the player will be known.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>roomId </td>
  <td>string</td>
  <td><p>ID of the room in which the player will play.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>url </td>
  <td>string</td>
  <td><p>URL for invite link.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "playerId": "string",
  "playerName": "string",
  "roomId": "string",
  "url": "string"
}
```








<a name="channel-joinRoomRp"></a>







###  `publish` joinRoomRp

Response of joinRoom-Event.








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>playerId </td>
  <td>string</td>
  <td><p>ID under which the player will be known.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>playerName </td>
  <td>string</td>
  <td><p>Name under which the player will be known.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>roomId </td>
  <td>string</td>
  <td><p>ID of the room in which the player will play.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>url </td>
  <td>string</td>
  <td><p>URL for invite link.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "playerId": "string",
  "playerName": "string",
  "roomId": "string",
  "url": "string"
}
```








<a name="channel-gameState"></a>







###  `publish` playerGameStateUpdate

Game state for specific player.








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>playerId </td>
  <td>string</td>
  <td><p>The ID of the player to which this playerGameState belongs.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>coins </td>
  <td>number</td>
  <td><p>The aomount of coins this player has.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>inventory </td>
  <td>InventoryItem[]</td>
  <td><p>All items the player has in his inventory with the corresponding amount.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>ships </td>
  <td>Ship[]</td>
  <td><p>All ships the player owns with the position, size, healt, ec.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>hits </td>
  <td>Coordinates[]</td>
  <td><p>All successfull shots of the player towards a enemy.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>alive </td>
  <td>boolean</td>
  <td><p>If the player is still alive.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "playerId": "7zuad7",
  "coins": 3000,
  "inventory": InventoryItem[],
  "ships": Ship[],
  "hits": Coordinates[],
  "alive": true
}
```








<a name="channel-generalGameState"></a>







###  `publish` generalGameState
Game state for all players in a specific room.








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>gameId </td>
  <td>string</td>
  <td><p>The gameId to which this gameState belongs.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>players </td>
  <td>string[]</td>
  <td><p>All player IDs in this room.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>playerNames </td>
  <td>string[]</td>
  <td><p>All the player names of the players in this room.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>admin </td>
  <td>string</td>
  <td><p>The userId of the admin of this game.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>rounds </td>
  <td>number</td>
  <td><p>How many rounds will be played in this game.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>currentRound </td>
  <td>string?</td>
  <td><p>In which round the current game actually is.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>turn </td>
  <td>string?</td>
  <td><p>The userId if the player that it is its turn.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>terrainMap </td>
  <td>number[]</td>
  <td><p>The general terrain of the battlefield.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>fog </td>
  <td>Fog?</td>
  <td><p>The game boundaries as a fog.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>started </td>
  <td>boolean</td>
  <td><p>If the game started already or not.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>privateLobby </td>
  <td>boolean</td>
  <td><p>If the game is private or free to join.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "gameId": "string",
  "players": ["aiu230", "9a7f8p"],
  "playerNames": ["Paul", "Josh"]
  "admin": "aiu230",
  "rounds": 5,
  "currentRound": 2,
  "turn": "aiu230",
  "terrainMap": [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,...],
  "fog": FOG,
  "started": true,
  "privateLobby": false
}
```








<a name="channel-chatMessage"></a>







###  `publish` chatMessage

Response when chat message got sent.








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>sender </td>
  <td>string?</td>
  <td><p>Player name of Sender.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>msg </td>
  <td>string</td>
  <td><p>Content of chat message.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>owner </td>
  <td>boolean?</td>
  <td><p>If the sender of the message is the owner himself.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "sender": "ui8786",
  "message": "Hello this is a chat message!",
  "owner": true
}
```








<a name="channel-gameEventError"></a>







###  `publish` gameEventError
Error for incorrect game events.








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>message </td>
  <td>string</td>
  <td><p>Error message and advice.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "message": "string"
}
```
