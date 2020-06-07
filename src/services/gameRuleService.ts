import { ShipBlock, ServerGameState, Ship, PlayerGameState } from "interfaces/interfaces";
import { coordinateToIndex, calculateDistance } from "../helpers/helpers";

export const turnTime: number = 30000;

export function checkMove(map: number[], ship: Ship, position: ShipBlock, direction: string) {
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
            if (position.x >= 1 && map[goalIndex] == 0) return true;
            break;
        case 'right':
            goalIndex = coordinateToIndex(mapSize, position.x + 1, position.y)
            if (position.x < (mapSize - 2) && map[goalIndex] == 0) return true;
            break;
        case 'up':
            goalIndex = coordinateToIndex(mapSize, position.x, position.y - 1);
            if (position.y >= 1 && map[goalIndex] == 0) return true;
            break;
        case 'down':
            goalIndex = coordinateToIndex(mapSize, position.x, position.y + 1);
            if (position.y < (mapSize - 2) && map[goalIndex] == 0) return true;
            break;
    }

    throw new Error('SHIP_CAN_NOT_MOVE_ON_THIS_TILE');
}

export function checkLoot(map: number[], ship: Ship, lootFrom: ShipBlock, lootSpot: number) {
    const fromIndex = coordinateToIndex(map.length, lootFrom.x, lootFrom.y);

    if(calculateDistance(map, fromIndex, lootSpot) != 1) {
        throw new Error('NOT_CLOSE_ENOUGH_TO_ISLAND_TO_LOOT');
    }
    if(lootFrom.health <= 0) {
        throw new Error('DESTROYED_SHIP_CAN_NOT_LOOT');
    }
    if(ship.shotsOrMoves < 1) {
        throw new Error('NO_MORE_MOVES_FOR_THIS_SHIP');
    }
    
    return true;
}

export function resetShotsOrMoves(sgs: ServerGameState) {
    let newState: ServerGameState = JSON.parse(JSON.stringify(sgs));

    for (let player in newState.playerGameStates) {
        for (let ship of newState.playerGameStates[player].ships) {
            for (let position of ship.position) {
                if(position.health == 1) {
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