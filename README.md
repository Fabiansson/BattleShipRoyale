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
| FA-0  | Das Spiel ist Runden-basiert.                                              | MUSS      |
| FA-1  | Das Spiel besitzt ein grafisches Interface                                 | MUSS      |
| FA-2  | Das Spiel können mehrere Spieler spielen.                                  | MUSS      |
| FA-3  | Der User kann ein neues Spiel starten.                                     | MUSS      |
| FA-4  | Die Punktezahl der Spieler ist ersichtlich.                                | MUSS      |
| FA-5  | Der Spieler kann Schiffe platzieren.                                       | MUSS      |
| FA-6  | Es gibt Schiffe mit verschiedenen Grössen.                                 | MUSS      |
| FA-7  | Jeder Spieler sieht die noch vorhandenen Schiffe auf einer Legende.        | MUSS      |
| FA-8  | Bei jedem Treffer erhält ein Spieler Geld.                                 | MUSS      |
| FA-9  | Jeder Spieler sieht nur seine eigene oder die von ihm getroffenen Schiffe. | MUSS      |
| FA-10 | Die Spieler können nach jeder Runde Upgrades in einem Store kaufen         | MUSS      |
| FA-11 | Das Spiel enthält «Upgrades»                                               | MUSS      |
| FA-12 | Das Spiel enthält Inseln mit Schatztruhen.                                 | MUSS      |
| FA-13 | Am Ende des Spieles wird der Sieger genannt.                               | MUSS      |
| FA-14 | Das Spiel endet, wenn nur noch ein Spieler Schiffe besitzt.                | MUS       |
| FA-15 | Das Spiel wird beendet, wenn alle Spieler das Spiel verlassen.             | MUSS      |
| FA-16 | Das Spiel besitzt einen geregelten Spielverlauf                            | MUSS      |
| FA-17 | Spieler können miteinander chatten                                         | KANN      |
| FA-18 | Ein Spieler kann andere Spieler einladen                                   | KANN      |
| FA-19 | Über den Chat lassen sich Emoji verschicken.                               | KANN      |
| FA-20 | Mit der Zeit wird das Spielfeld kleiner.                                   | KANN      |
| FA-21 | Der Spielstand wird gespeichert (für Verbindungsverlust)                   | MUSS      |
| FA-22 | Spieler können einen Spielraum beitreten.                                  | MUSS      |
| FA-23 | Spieler können einen Spielraum eröffnen.                                   | MUSS      |


## Nicht-Funktional
| ID    | Beschreibung                                                 | MUSS/KANN |
|-------|--------------------------------------------------------------|-----------|
| NFA-1 | Die Punkte werden richtig gezählt.                           | MUSS      |
| NFA-2 | Spielzüge sind regelkonform.                                 | MUSS      |
| NFA-3 | Das Spiel ist internationalisierbar.                         | MUSS      |
| NFA-4 | Der Inhalt ist responsive.                                   | MUSS      |
| NFA-5 | Das Spiel kann über eine Internetverbindung erreicht werden. | MUSS      |

## Randbedingungen
| ID   | Beschreibung                                           | MUSS/KANN |
|------|--------------------------------------------------------|-----------|
| RB-1 | Das Spiel besitzt eine Client/Server Architektur       | MUSS      |
| RB-2 | Client kommuniziert über Text-basiertes Protokoll      | MUSS      |
| RB-3 | Das Protokoll ist lesbar.                              | MUSS      |
| RB-4 | Client nimmt Benutzereingabe durch GUI entgegen.       | MUSS      |
| RB-5 | Synchronisation des Status des Spielers mit dem Client | MUSS      |
| RB-6 | Die Umsetzung basiert auf HTML5, CSS3 und JS.          | MUSS      |
| RB-7 | UI wird mit React und Typescript umgesetzt.            | MUSS      |


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










