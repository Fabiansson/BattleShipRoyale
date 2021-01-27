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
