# BattleShipRoyale :boat:💥:gun::ship::anchor: 
A mix between the pen and paper Battleship game and a modern Battle Royale.
At the beginning every player has the same amount of ships. They can earn coin with sinking the enemies ships. The location of the enemy ship is not known.  Every hit generates an equal amount of coins. Every “ship-field” can normally shoot ones or move one field. If there are no actions left, it is the next players turn to make his/her move.
The last standing player wins a round. In every round the player can use his/her coins to buy upgrades for a better chance of survival.
Earning coins with sinking ships is not the only way to make money. It is possible to find treasures by exploring different islands on the map.
Whoever has the most wins in his/her pocket, wins the game.

# Anforderungen
## Funktional
| ID    | Beschreibung                                                               | MUSS/KANN |
|-------|----------------------------------------------------------------------------|-----------|
| FA-0  | The game is bsed on rounds.                                                | MUSS      |
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


## Nicht-Funktional
| ID    | Beschreibung                                                 | MUSS/KANN |
|-------|--------------------------------------------------------------|-----------|
| NFA-1 | Points are counted correctly and by certain rules.           | MUSS      |
| NFA-2 | Game moves work according to certain rules.                  | MUSS      |
| NFA-3 | The game is international.                                   | MUSS      |
| NFA-4 | The User Interface is responsive.                            | MUSS      |
| NFA-5 | The game can be played online in a browser.                  | MUSS      |

## Randbedingungen
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
###  `subscribe` createRoom
Opens new game session for players.

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
  <td><p>ID of initiating player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>playerName </td>
  <td>string</td>
  <td><p>Name of initiating player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "playerId": "string",
  "playerName": "string"
}
```








<a name="channel-joinRoom"></a>











###  `subscribe` joinRoom
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
  <td>playerId </td>
  <td>string</td>
  <td><p>ID of initiating player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>playerName </td>
  <td>string</td>
  <td><p>Name of initiating player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>roomId </td>
  <td>string</td>
  <td><p>Possible room ID for joining a specific game.</p>
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








<a name="channel-leaveRoom"></a>








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
  <td>playerId </td>
  <td>string</td>
  <td><p>ID of sending player.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>playerName </td>
  <td>string</td>
  <td><p>Name of sending player.</p>
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
  <td>receiverId </td>
  <td>string</td>
  <td><p>Possible reciver of message. (default is broadcast)</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>message </td>
  <td>string</td>
  <td><p>Content of chat message.</p>
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
  "receiverId": "string",
  "message": "string"
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







###  `publish` gameState

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
  <td>tbd </td>
  <td>tbd</td>
  <td><p>tbd...</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "tbd": null
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
  <td>tbd </td>
  <td>tbd</td>
  <td><p>tbd...</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "tbd": null
}
```








<a name="channel-chatMessageRp"></a>







###  `publish` chatMessageRp

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
  <td>playerName </td>
  <td>string</td>
  <td><p>Name of sender.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
      
<tr>
  <td>message </td>
  <td>string</td>
  <td><p>Content of chat message.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "playerName": "string",
  "message": "string"
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





