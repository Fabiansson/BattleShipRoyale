import { ServerGameState, UseReport, Item } from "interfaces/interfaces";
import { getCoordinates, removeByIndex } from "../helpers/helpers";

export const itemList = [
    {
        id: 0,
        name: "Protection",
        desc: "Allows the Player to protect one ship. If the ship is attacked it won't get destroyed",
        price: 50,
        img: "hjk"
    },
    {
        id: 1,
        name: "Double Shot",
        desc: "The Player shoots twice from the same ship",
        price: 100,
        img: "../../../src/assets/bullet.svg"
    },
    {
        id: 2,
        name: "Small Ship",
        desc: "A small and handy ship.",
        price: 50,
        img: "sdfdf"
    },
    {
        id: 3,
        name: "Medium Ship",
        desc: "A medium sized and strong ship.",
        price: 90,
        img: "sdfdf"
    },
    {
        id: 4,
        name: "Big Ship",
        desc: "A big and very powerfull ship",
        price: 120,
        img: "sdfdf"
    }
]

export function useItem(userId: string, sgs: ServerGameState, itemId: number, on: number) {
    switch (itemId) {
        case 0:
            return useProtection(userId, sgs, on)
            break;
        case 1:
            return useDoubleShot(userId, sgs, on);
        default:
            throw new Error('ITEM_DOES_NOT_EXIST');
    }
}

export function getItem(id: number) {
    return itemList.find(item => item.id === id);
}

function useProtection(userId: string, sgs: ServerGameState, on: number) {
    const useCoordinates: number[] = getCoordinates(sgs.generalGameState.terrainMap.length, on);
    let inventory: Item[] = sgs.playerGameStates[userId].inventory;

    const inventoryIndex = inventory.findIndex(item => item.id === 0);
    if(inventoryIndex === -1){
        throw new Error('PLAYER_DOES_NOT_HAVE_SUCH_ITEM');
    }
    for (let ship of sgs.playerGameStates[userId].ships) {
        for (let position of ship.position) {
            if (position.x === useCoordinates[0] && position.y === useCoordinates[1]) {
                position.health++;
                inventory = removeByIndex(inventory, inventoryIndex);

                let useReport: UseReport = { generalGameState: null, playerGameStates: {} };

                useReport.playerGameStates[userId] = sgs.playerGameStates[userId];
                return (useReport);
            }
        }
    }

    throw new Error('NO_SHIP_FOUND_TO_USE_PROTECTION_ON');
}

function useDoubleShot(userId: string, sgs: ServerGameState, on: number) {
    const useCoordinates: number[] = getCoordinates(sgs.generalGameState.terrainMap.length, on);
    let inventory: Item[] = sgs.playerGameStates[userId].inventory;

    const inventoryIndex = inventory.findIndex(item => item.id === 1);
    if(inventoryIndex === -1){
        throw new Error('PLAYER_DOES_NOT_HAVE_SUCH_ITEM');
    }
    for (let ship of sgs.playerGameStates[userId].ships) {
        for (let position of ship.position) {
            if (position.x === useCoordinates[0] && position.y === useCoordinates[1]) {
                ship.shotsOrMoves++;
                inventory = removeByIndex(inventory, inventoryIndex);

                let useReport: UseReport = { generalGameState: null, playerGameStates: {} };

                useReport.playerGameStates[userId] = sgs.playerGameStates[userId];
                return (useReport);
            }
        }
    }

    throw new Error('NO_SHIP_FOUND_TO_USE_DOUBLESHOT_ON');
}