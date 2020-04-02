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
  playerGameStates?: PlayerGameState[],
  map?: Map
}

export interface GeneralGameState {
  gameId: string,
  players: string[],
  playerNames: string[],
  admin: string,
  rounds: number,
  currentRound?: number
  turn?: string,
  terrainMap?: number[],
  fog?: Fog,
  started: boolean,
  privateLobby: boolean
}

export interface PlayerGameState {
  playerId: string,
  coins: number,
  inventory: InventoryItem[],
  ships: Ship[],
  hits: HitCoordinates[],
  alive: boolean,
}

export interface InventoryItem {
  itemId: number,
  amount: number
}

export interface Ship {
  size: number,
  xStart: number,
  xEnd: number,
  yStart: number,
  yEnd: number,
  shotsOrMoves: number,
  health: number[]  //[1,1,1] or [0,0,1] for ship with size 3
}

export interface HitCoordinates {
  x: number,
  y: number
}