import { ShipBlock, ServerGameState, Ship, PlayerGameState, Fog, PlayerGameStateCollection } from "interfaces/interfaces";
import { coordinateToIndex, calculateDistance, getRandomInt } from "../helpers/helpers";
import { isInFog } from "./mapService";
import { itemList } from "./itemService";

export const turnTime: number = 30000;
export const CHESTS_PER_PLAYER: number = 3;

export function checkMove(map: number[], fog: Fog, ship: Ship, position: ShipBlock, direction: string) {
    const mapSize = map.length;
    let goalIndex = null;

    if (ship.shotsOrMoves < 1) {
        throw new Error('NO_MOVES_LEFT');
    }
    if(position.health <= 0) {
        throw new Error('DESTROYED_SHIPS_CAN_NOT_MOVE');
    }

    switch (direction) {
        case 'left':
            goalIndex = coordinateToIndex(mapSize, position.x - 1, position.y)
            if (position.x >= 1 && map[goalIndex] == 0 && !isInFog(mapSize, fog, goalIndex)) return true;
            break;
        case 'right':
            goalIndex = coordinateToIndex(mapSize, position.x + 1, position.y)
            if (position.x < (mapSize - 2) && map[goalIndex] == 0 && !isInFog(mapSize, fog, goalIndex)) return true;
            break;
        case 'up':
            goalIndex = coordinateToIndex(mapSize, position.x, position.y - 1);
            if (position.y >= 1 && map[goalIndex] == 0 && !isInFog(mapSize, fog, goalIndex)) return true;
            break;
        case 'down':
            goalIndex = coordinateToIndex(mapSize, position.x, position.y + 1);
            if (position.y < (mapSize - 2) && map[goalIndex] == 0 && !isInFog(mapSize, fog, goalIndex)) return true;
            break;
    }

    throw new Error('SHIP_CAN_NOT_MOVE_ON_THIS_TILE');
}

export function checkLoot(map: number[], lootMap: number[], fog: Fog, ship: Ship, lootFrom: ShipBlock, lootSpot: number) {
    const fromIndex = coordinateToIndex(map.length, lootFrom.x, lootFrom.y);

    if(calculateDistance(map.length, fromIndex, lootSpot) != 1) {
        throw new Error('NOT_CLOSE_ENOUGH_TO_ISLAND_TO_LOOT');
    }
    if(lootFrom.health <= 0) {
        throw new Error('DESTROYED_SHIP_CAN_NOT_LOOT');
    }
    if(ship.shotsOrMoves < 1) {
        throw new Error('NO_MORE_MOVES_FOR_THIS_SHIP');
    }
    if(isInFog(map.length, fog, lootSpot)) {
        throw new Error('CAN_NOT_LOOT_ISLANDS_IN_FOG');
    }
    if (!lootMap.includes(lootSpot)) { //If field contains loot
        throw new Error('THIS_FIELD_DOES_NOT_CONTAIN_ANY_LOOT');
    }
    
    return true;
}

export function resetShotsOrMoves(sgs: ServerGameState) {
    let newState: ServerGameState = JSON.parse(JSON.stringify(sgs));

    for (let player in newState.playerGameStates) {
        for (let ship of newState.playerGameStates[player].ships) {
            ship.shotsOrMoves = 0;
            for (let position of ship.position) {
                if(position.health > 0) {
                    ship.shotsOrMoves++;
                }
            }
        }
    }
    
    return newState;
}

export function checkAlive(victim: PlayerGameState) {
    let alive = false;

    for(let ship of victim.ships) {
        for(let position of ship.position) {
            if(position.health > 0) alive = true;
        }
    }

    return alive;
}

export function fogEatsShips(sgs: ServerGameState, fog: Fog) {
    let playerGameStates: PlayerGameStateCollection = {};

    let newState: ServerGameState = JSON.parse(JSON.stringify(sgs));
    const mapSize = sgs.generalGameState.terrainMap.length;

    for (let player in newState.playerGameStates) {
        for(let ship of newState.playerGameStates[player].ships) {
            for(let position of ship.position) {
                const blockIndex: number = coordinateToIndex(mapSize, position.x, position.y);
                if (isInFog(mapSize, fog, blockIndex) && position.health > 0) {
                    position.health = 0;
                    newState.playerGameStates[player].alive = checkAlive(newState.playerGameStates[player]);
                    playerGameStates[player] = newState.playerGameStates[player];
                }
            }
        }
    }

    return {serverGameState: newState, playerGameStates};
}

export function getRandomItem() {
    const amountOfItems = itemList.length;
    const luckyNumber = getRandomInt(0, amountOfItems - 1);

    return itemList[luckyNumber];
}