import { ServerGameState, UseReport, Item } from "interfaces/interfaces";
import { getCoordinates, removeByIndex } from "../helpers/helpers";

export const itemList = [
    {
        id: 0,
        name: "Protection",
        desc: "protDesc",
        price: 50,
        img: "https://cdn.pixabay.com/photo/2015/04/11/10/08/shield-717505_960_720.png"
    },
    {
        id: 1,
        name: "Double Shot",
        desc: "shotDesc",
        price: 100,
        img: "data:image/jpeg;base64,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"
    },
    {
        id: 2,
        name: "Small Ship",
        desc: "smallShipDesc",
        price: 50,
        img: "https://cdn.pixabay.com/photo/2013/07/12/12/49/ship-146312_960_720.png"
    },
    {
        id: 3,
        name: "Medium Ship",
        desc: "mediumShipDesc",
        price: 90,
        img: "https://cdn.pixabay.com/photo/2013/07/12/12/49/ship-146312_960_720.png"
    },
    {
        id: 4,
        name: "Big Ship",
        desc: "bigShipDesc",
        price: 120,
        img: "https://cdn.pixabay.com/photo/2013/07/12/12/49/ship-146312_960_720.png"
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