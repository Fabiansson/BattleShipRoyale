# Requirements
## Functional
| ID    | Description                                                                | Necessary/Optional |
|-------|----------------------------------------------------------------------------|--------------------|
| FA-0  | The game is based on rounds.                                               | Necessary          |
| FA-1  | The game has a graphical User Interface.                                   | Necessary          |
| FA-2  | The game is a multiplayer game.                                            | Necessary          |
| FA-3  | A player can host his own game.                                            | Necessary          |
| FA-4  | The game can be won by getting the most points.                            | Necessary          |
| FA-5  | The player can use battleships to play.                                    | Necessary          |
| FA-6  | There are battleships in different sizes.                                  | Necessary          |
| FA-7  | Each Player sees his own ships in a overview.                              | Necessary          |
| FA-8  | The player gets coins for each hit.                                        | Necessary          |
| FA-9  | Each player only sees his own and the ships that he hit from the enemies.  | Necessary          |
| FA-10 | After each round Upgrades and Items can be bought.                         | Necessary          |
| FA-11 | The game contains Upgrades                                                 | Necessary          |
| FA-12 | The game has islands with lootboxes.                                       | Necessary          |
| FA-13 | Ther will be a winner at the end and it will show who it was.              | Necessary          |
| FA-14 | The game ends if all rounds are player and only one player has ships left. | Necessary          |
| FA-15 | The game ends if all players leave.                                        | Optional           |
| FA-16 | The game has his own game progress.                                        | Necessary          |
| FA-17 | Players can chat with eachother.                                           | Optional           |
| FA-18 | A player can invite other players into his game.                           | Necessary          |
| FA-19 | The chat supports emojis.                                                  | Optional           |
| FA-20 | Depending on progress of the game the battleground will be limited by fog. | Optional           |
| FA-21 | Players can rejoin the game if they leave or loose connection.             | Necessary          |


## Non-Functional
| ID    | Description                                                  | Necessary/Optional |
|-------|--------------------------------------------------------------|--------------------|
| NFA-1 | Points are counted correctly and by certain rules.           | Necessary          |
| NFA-2 | Game moves work according to certain rules.                  | Necessary          |
| NFA-3 | The game is international.                                   | Necessary          |
| NFA-4 | The User Interface is responsive.                            | Necessary          |
| NFA-5 | The game can be played online in a browser.                  | Necessary          |

## Boundry Conditions
| ID   | Description                                                   | Necessary/Optional |
|------|--------------------------------------------------------------|---------------------|
| RB-1 | The game is built with a client/server architecture.         | Necessary           |
| RB-2 | The client communicates with the server over a text-protocol.| Necessary           |
| RB-3 | The protocol is readable.                                    | Necessary           |
| RB-4 | The game server is controller via the User Interface.        | Necessary           |
| RB-5 | The Game State is always n sync with all game clients.       | Necessary           |
| RB-6 | The client is based on HTML, CSS & JS.                       | Necessary           |
| RB-7 | The UI is built with React.js and Typescript.                | Necessary           |
