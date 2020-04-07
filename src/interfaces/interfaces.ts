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
  nextXCenter: number,
  nextYCenter: number
}

//Questionable bc a lot of duplicate information
export interface ServerGameState {
  generalGameState: GeneralGameState,
  playerGameStates: {
    [key: string]: PlayerGameState
  },
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
  fog?: Fog,
  started: boolean,
  privateLobby: boolean
}

export interface PlayerGameState {
  coins: number,
  inventory: InventoryItem[],
  ships: Ship[],
  hits: HitCoordinates[],
  alive: boolean,
}

export interface Player {
  playerId: string,
  playerName: string
}

export interface InventoryItem {
  itemId: number,
  amount: number
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

export interface HitCoordinates {
  x: number,
  y: number,
  hit: boolean
}