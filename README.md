# BattleShipRoyale :boat:💥:gun::ship::anchor: 
A mix between the pen and paper Battleship game and a modern Battle Royale.
At the beginning every player has the same amount of ships. They can earn coin with sinking the enemies ships. The location of the enemy ship is not known.  Every hit generates an equal amount of coins. Every “ship-field” can normally shoot ones or move one field. If there are no actions left, it is the next players turn to make his/her move.
The last standing player wins a round. In every round the player can use his/her coins to buy upgrades for a better chance of survival.
Earning coins with sinking ships is not the only way to make money. It is possible to find treasures by exploring different islands on the map.
Whoever has the most wins in his/her pocket, wins the game.

# Requirements
## Functional
| ID    | Beschreibung                                                               | MUSS/KANN |
|-------|----------------------------------------------------------------------------|-----------|
| FA-0  | The game is based on rounds.                                                | MUSS      |
| FA-1  | The game has a graphical User Interface.                                   | MUSS      |
| FA-2  | The game is a multiplayer game.                                            | MUSS      |
| FA-3  | A player can host his own game.                                            | MUSS      |
| FA-4  | The game can be won by getting the most points.                            | MUSS      |
| FA-5  | The player can use battleships to play.                                    | MUSS      |
| FA-6  | There are battleships in different sizes.                                  | MUSS      |
| FA-7  | Each Player sees his own ships in a overview.                              | MUSS      |
| FA-8  | The player gets coins for each hit.                                        | MUSS      |
| FA-9  | Each player only sees his own and the ships that he hit from the enemies.  | MUSS      |
| FA-10 | After each round Upgrades and Items can be bought.                         | MUSS      |
| FA-11 | The game contains Upgrades                                                 | MUSS      |
| FA-12 | The game has islands with lootboxes.                                       | MUSS      |
| FA-13 | Ther will be a winner at the end and it will show who it was.              | MUSS      |
| FA-14 | The game ends if all rounds are player and only one player has ships left. | MUS       |
| FA-15 | The game ends if all players leave.                                        | MUSS      |
| FA-16 | The game has his own game progress.                                        | MUSS      |
| FA-17 | Players can chat with eachother.                                           | KANN      |
| FA-18 | A player can invite other players into his game.                           | MUSS      |
| FA-19 | The chat supports emojis.                                                  | KANN      |
| FA-20 | Depending on progress of the game the battleground will be limited by fog. | KANN      |
| FA-21 | Players can rejoin the game if they leave or loose connection.             | MUSS      |


## Non-Functional
| ID    | Beschreibung                                                 | MUSS/KANN |
|-------|--------------------------------------------------------------|-----------|
| NFA-1 | Points are counted correctly and by certain rules.           | MUSS      |
| NFA-2 | Game moves work according to certain rules.                  | MUSS      |
| NFA-3 | The game is international.                                   | MUSS      |
| NFA-4 | The User Interface is responsive.                            | MUSS      |
| NFA-5 | The game can be played online in a browser.                  | MUSS      |

## Boundry Conditions
| ID   | Beschreibung                                           | MUSS/KANN |
|------|--------------------------------------------------------|-----------|
| RB-1 | The game is built with a client/server architecture.   | MUSS      |
| RB-2 | The client communicates with the server over a text-protocol.      | MUSS      |
| RB-3 | The protocol is readable.                              | MUSS      |
| RB-4 | The game server is controller via the User Interface.  | MUSS      |
| RB-5 | The Game State is always n sync with all game clients. | MUSS      |
| RB-6 | The client is based on HTML, CSS & JS.                 | MUSS      |
| RB-7 | The UI is built with React.js and Typescript.          | MUSS      |


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
  "playerId": "string",
  "playerName": "string",
  "roomId": "string"
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
  "userId": "string",
  "playerName": "string
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
  "playerId": "string",
  "coins": "number",
  "inventory": "InventoryItem[]",
  "ships": "Ship[]",
  "hits": "Coordinates[]",
  "alive": "boolean"
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
  players: ["aiu230", "9a7f8p"],
  playerNames: ["Paul", "Josh"]
  admin: "aiu230",
  rounds: 5,
  currentRound: 2,
  turn: "aiu230",
  terrainMap: [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,...],
  fog: FOG,
  started: true,
  privateLobby: false
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

# Modularity
```bash
.
├── client
│   ├── public
│   └── src
│       ├── assets
│       ├── components
│       └── services
└── src
    ├── helpers
    ├── interfaces
    ├── redis
    ├── services
    ├── socket
    └── tests
```
The project is divided in two parts. The client folder for the frontend and the first src folder which contains the backend.


## client / src 
The client folder is composed out of an other src folder. In this folder we separeted assets, components and services. The rest of the structur was already preset by react.
### assets
All svg, jpg or png files are stored in the assets folder. 
### components
Every UI component has its own class. In our case they are:
<ul>
  <li><strong>Battleground.tsx:</strong> The Gameboard</li>
  <li><strong>Chat.tsx:</strong> Chat for the players</li>
  <li><strong>Gamebar.tsx:</strong> Overview wit name, score and coin counter</li>
  <li><strong>HostDialog.tsx:</strong> Link the Host gets to send the other players</li>
  <li><strong>Lobby.tsx:</strong> Waiting room until players joined the game</li>
  <li><strong>OpponentInventory.tsx:</strong> Players see how many opponent ships are in play.</li>
  <li><strong>WelcomeCard.tsx:</strong> User can choose between hosting or playing a game</li>
</ul>     

### services
Services includes the SocketProvider which provides global context for the websocket instance. So it can be used from every component. 

## src (server)
Our backend is not the average structure (server) because we used Typescript.
### helpers
Methods to help random stuff. It gives assistance to other components.
### interfaces
Contains Typesyript interfaces.
### redis
Initializing of redis instance.
### services
Low level functions.
<ul>
  <li><strong>GameRuleService.ts:</strong> Rules for the gameplay</li>
  <li><strong>GameService.ts:</strong> Gameplay</li>
</ul>

### socket

The socket folder contains two files:
<ul>
  <li><strong>index.ts:</strong> Initializing of socket instance</li>
  <li><strong>socketController.ts:</strong>Endpoint/Handlers</li>
</ul>  

### tests
Testcases for different functions.  





