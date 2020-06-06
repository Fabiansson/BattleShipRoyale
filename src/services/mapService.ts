import { calculateDistance, getRandomInt, shuffle, getCoordinates } from "../helpers/helpers";
import { Ship } from "interfaces/interfaces";

export function createTerrainMap(size: number) {
    let map: number[] = [];
    for (let i = 0; i < size; i++) {
        map.push(0);
    }

    map = placeStarters(map, 5);
    map = shuffle(map);
    map = growIslands(map, 0.1);

    return map;
}

function placeStarters(array: number[], amount: number) {
    for (let i = 0; i < amount; i++) {
        array[i] = 1;
    }
    return array;
}

function growIslands(array: number[], percentage: number) {
    let tiles = Math.floor(array.length * percentage);

    let centerPoints = [];

    array.forEach((el, index) => {
        if (el == 1) {
            centerPoints.push(index);
        }
    })

    for (let i = 0; i < array.length; i++) {
        centerPoints.forEach(centerPoint => {
            if (calculateDistance(array, centerPoint, i) < 2 && tiles > 0) {
                array[i] = 1;
                tiles--;
            }
        })
    }

    return array;
}

export function placeShips(map: number[], amountOfPlayers: number) {
    let shipPacks: Ship[][] = [];
    let blocks: number[] = [];

    let mapSize = map.length;
    let mapWidth = Math.floor(Math.sqrt(mapSize));

    for (let i = 0; i < amountOfPlayers; i++) {
        shipPacks.push([]);
        for (let j = 0; j < 3; j++) {
            let random = getRandomInt(0, mapSize - 1);
            if (map[random] == 0 && !blocks.includes(random)) {
                switch (j) {
                    case 0:
                        if (getRandomInt(0, 1) == 0) { //HORZONTAL
                            if (map[random - 1] == 0 && calculateDistance(map, random, random - 1) == 1 &&
                                map[random + 1] == 0 && calculateDistance(map, random, random + 1) == 1 &&
                                !blocks.includes(random - 1) && !blocks.includes(random) && !blocks.includes(random + 1)) {
                                blocks.push(random - 1);
                                blocks.push(random);
                                blocks.push(random + 1);
                            } else {
                                j--;
                                continue;
                            }
                        } else {
                            if (map[random - mapWidth] == 0 && calculateDistance(map, random, random - mapWidth) == 1 &&
                                map[random + mapWidth] == 0 && calculateDistance(map, random, random + mapWidth) == 1 &&
                                !blocks.includes(random - mapWidth) && !blocks.includes(random) && !blocks.includes(random + mapWidth)) {
                                blocks.push(random - mapWidth);
                                blocks.push(random);
                                blocks.push(random + mapWidth);
                            } else {
                                j--;
                                continue;
                            }
                        }
                        shipPacks[i].push({
                            shotsOrMoves: 3,
                            position: [
                                { x: getCoordinates(mapSize, blocks[6 * i + 0])[0], y: getCoordinates(mapSize, blocks[0])[1], health: 1 },
                                { x: getCoordinates(mapSize, blocks[6 * i + 1])[0], y: getCoordinates(mapSize, blocks[1])[1], health: 1 },
                                { x: getCoordinates(mapSize, blocks[6 * i  + 2])[0], y: getCoordinates(mapSize, blocks[2])[1], health: 1 }]
                        });
                        break;
                    case 1:
                        if (getRandomInt(0, 1) == 0) { //HORZONTAL
                            if (map[random - 1] == 0 && calculateDistance(map, random, random - 1) == 1 &&
                            !blocks.includes(random - 1) && !blocks.includes(random)) {
                                blocks.push(random - 1);
                                blocks.push(random);
                            } else {
                                j--;
                                continue;
                            }
                        } else {
                            if (map[random - mapWidth] == 0 && calculateDistance(map, random, random - mapWidth) == 1 &&
                            !blocks.includes(random - mapWidth) && !blocks.includes(random)) {
                                blocks.push(random - mapWidth);
                                blocks.push(random);
                            } else {
                                j--;
                                continue;
                            }
                        }
                        shipPacks[i].push({
                            shotsOrMoves: 2,
                            position: [
                                { x: getCoordinates(mapSize, blocks[6 * i + 3])[0], y: getCoordinates(mapSize, blocks[3])[1], health: 1 },
                                { x: getCoordinates(mapSize, blocks[6 * i + 4])[0], y: getCoordinates(mapSize, blocks[4])[1], health: 1 }]
                        });
                        break;
                    case 2:
                        if (map[random] == 0 && !blocks.includes(random)) {
                            blocks.push(random);
                        } else {
                            j--;
                            continue;
                        }
                        shipPacks[i].push({
                            shotsOrMoves: 1,
                            position: [
                                { x: getCoordinates(mapSize, blocks[6 * i + 5])[0], y: getCoordinates(mapSize, blocks[5])[1], health: 1 }]
                        });
                        break;
                }
            } else {
                j--;
                continue;
            }
        }
    }
    return shipPacks;
}