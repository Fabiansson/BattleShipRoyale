declare module 'redis' {
  export interface RedisClient extends NodeJS.EventEmitter {
    setAsync(...args: any[]): Promise<any>;
    getAsync(...args: any[]): Promise<any>;
  }
}

export interface GameSettings {
  privateLobby: boolean,
  rounds: number
}

export interface ErrorResponse {
  errorId?: number,
  error: string
}

export interface JoinRequest {
  gameId: string
}

export interface JoinResponse {
  gameId: string,
  started: boolean,
  players: string[],
  playerNames: string[]
}

export interface ChatMessage {
  sender?: string,
  msg: string,
  owner?: boolean
}

export interface Map {
  gameId: string,
  map: (string|number)[][] //fist index TileType, second index owner
}

//REDIS
export interface Fog {
  radius: number,
  xCenter: number,
  yCenter: number,
  nextRadius: number
  nextXCenter: number,
  nextYCenter: number
}

//Questionable bc a lot of duplicate information
export interface ServerGameState {
  generalGameState: GeneralGameState,
  playerGameStates: PlayerGameStateCollection,
  map?: Map
}

export interface GeneralGameState {
  gameId: string,
  players: Player[],
  admin: string,
  rounds: number,
  currentRound?: number
  turn?: Player,
  terrainMap?: number[],
  lootMap?: number[],
  fog?: Fog,
  started: boolean,
  privateLobby: boolean,
  winner?: Player
}

export interface PlayerGameState {
  coins: number,
  inventory: Item[],
  ships: Ship[],
  hits: Hit[],
  alive: boolean,
}

export interface Player {
  playerId: string,
  playerName: string
}

export interface Ship {
  shotsOrMoves: number,
  position: ShipBlock[]
}

export interface ShipBlock {
  x: number,
  y: number,
  health: number
}

export interface Hit {
  x: number,
  y: number,
}

export interface Item {
  id: number,
  name: string,
  desc: string,
  price: number,
  img: string
}

export interface Move {
  from: number,
  to: string
}

export interface Attack {
  from: number,
  to: number
}

export interface WarPlayerGameStates {
  attackerId: string,
  victimId?: string,
  playerGameStates: PlayerGameStateCollection,
  attackerMessage: string,
  victimMessage: string
}

export interface FogReport {
  serverGameState: ServerGameState,
  playerGameStates: PlayerGameStateCollection
}

export interface PlayerGameStateCollection {
  [key: string]: PlayerGameState
}

export interface LootReport {
  generalGameState: GeneralGameState,
  playerGameState: PlayerGameState
}

export interface UseReport {
  generalGameState?: GeneralGameState,
  playerGameStates: PlayerGameStateCollection
}

export interface ItemUtilization {
  itemId: number,
  on: number
}