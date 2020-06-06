import { ShipBlock, ServerGameState } from "interfaces/interfaces";
import { coordinateToIndex } from "../helpers/helpers";
import sharedsession from "express-socket.io-session";

export const turnTime: number = 30000;

export function checkMove(map: number[], position: ShipBlock, direction: string) {
    const mapSize = map.length;
    let goalIndex = null;

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

    return false;
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