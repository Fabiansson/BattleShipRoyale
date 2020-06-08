import React, { useState, useContext } from "react";
import './TwoDBattleground.css';
import { Ship, Fog, Hit, Item } from "../App";

import { useSnackbar } from 'notistack';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SocketContext from "../services/SocketProvider";
import { coordinateToIndex, calculateDistance } from "../services/helpers";

interface TwoDBattlegroundProps {
    terrain: number[],
    lootMap: number[],
    fog: Fog
    ships: Ship[],
    hits: Hit[],
    inventory: Item[]
}

export interface Move {
    from: number,
    to: string
}

export interface Attack {
    from: number,
    to: number
}

export interface ItemUtilization {
    itemId: number,
    on: number
}

function TwoDBattleground(props: TwoDBattlegroundProps) {
    const { enqueueSnackbar } = useSnackbar();
    const socket = useContext(SocketContext);
    const [selected, setSelected] = useState<string>('');
    const [availableRes, setAvailableRes] = useState<number | null>(null);
    const [menuAnchor, setMenuAnchor] = useState<HTMLTableCellElement | null>(null);
    let mapSize: number = 0;
    let mapWidth: number = 0;

    const createTableRows = () => {
        let mapData: number[] = [...props.terrain];

        mapSize = mapData.length;
        mapWidth = Math.floor(Math.sqrt(mapData.length));

        props.ships.forEach(ship => {
            ship.position.forEach(field => {
                let fieldNumber: number = coordinateToIndex(mapSize, field.x, field.y);
                if (field.health === 1){
                    mapData[fieldNumber] = 3;
                } else if (field.health >= 2) {
                    mapData[fieldNumber] = 7;
                } else {
                    mapData[fieldNumber] = 4;
                }
            })
        })

        props.hits.forEach(hit => {
            let fieldNumber: number = coordinateToIndex(mapSize, hit.x, hit.y);
            mapData[fieldNumber] = 2;
        })

        props.lootMap.forEach(loot => {
            mapData[loot] = 6;
        })

        let table = []
        for (let i = 0; i < mapWidth; i++) {
            let cols = []
            for (let j = 0; j < mapWidth; j++) {
                let tileNumber: number = j + mapWidth * i;
                let tileNumberS: string = tileNumber.toString(10);
                if(isInFog(props.terrain, props.fog, tileNumber, false)) {
                    cols.push(<td id={tileNumberS} key={tileNumberS} className={'tile-5'} onClick={handleFogClick}></td>);
                } else if(isInFog(props.terrain, props.fog, tileNumber, true)) {
                    cols.push(<td id={tileNumberS} key={tileNumberS} className={getBackground(tileNumberS, mapData) + ' soft'} onClick={handleClick}></td>);
                } else {
                    cols.push(<td id={tileNumberS} key={tileNumberS} className={getBackground(tileNumberS, mapData)} onClick={handleClick}></td>);
                }
            }
            table.push(<tr className={'roow-' + i} key={i}>{cols}</tr>)
        }

        return table
    }

    const handleClick = (event: any) => {
        let ship: Ship | null = isShip(event.target.id);
        if (ship) {
            if (selected === event.target.id) {
                setSelected('');
                setAvailableRes(null);
                return;
            }
            setSelected(event.target.id);
            setAvailableRes(ship!.shotsOrMoves);
            setMenuAnchor(event.currentTarget);
            return;
        }
        if (Boolean(selected)) {
            setMenuAnchor(event.currentTarget);
        }
    }

    const handleFogClick = () => {
        enqueueSnackbar('Nothing can be done in the fog...', {
            variant: 'error',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
          }
          });
    }

    const handleClose = () => {
        setMenuAnchor(null);
    }

    const attack = (anchor: string) => {
        let attack: Attack = { from: parseInt(selected), to: parseInt(anchor) }
        socket?.emit('attack', attack);
        setMenuAnchor(null);
        setSelected('');
        setAvailableRes(null);
    }

    const loot = (anchor: string) => {
        let loot: Attack = { from: parseInt(selected), to: parseInt(anchor) }
        socket?.emit('loot', loot);
        setMenuAnchor(null);
        setSelected('');
        setAvailableRes(null);
    }

    const moveTo = (direction: string) => {
        let move: Move = { from: parseInt(selected), to: direction }
        socket?.emit('moveTo', move);
        setMenuAnchor(null);
        setSelected('');
        setAvailableRes(null);
    }

    const utilizeItem = (itemId: number, anchor: string) => {
        let itemUtilization: ItemUtilization = { itemId: itemId, on: parseInt(anchor) };
        socket?.emit("use", itemUtilization);
        setMenuAnchor(null);
        setSelected('');
        setAvailableRes(null);
      }

    const isShip = (tileNumber: string) => {
        let isShip = null;
        props.ships.forEach(ship => {
            ship.position.forEach(field => {
                let fieldNumber: number = coordinateToIndex(mapSize, field.x, field.y);
                if (fieldNumber === parseInt(tileNumber)) {
                    isShip = ship;
                }
            })
        })
        return isShip;
    }

    const isIsland = (tileNumber: string) =>  {
        return props.terrain[parseInt(tileNumber)] === 1;
    }

    const getBackground = (tileNumber: string, map: number[]) => {
        if (selected === tileNumber) {
            return 'selected';
        } else if (menuAnchor && menuAnchor.id === tileNumber) {
            return 'aimed';
        } 
        return 'tile-' + map[parseInt(tileNumber)];
    }

    function isInFog(map: number[], fog: Fog, field: number, next: boolean) {
        const xCenter = next ? fog.nextXCenter : fog.xCenter;
        const yCenter = next ? fog.nextYCenter : fog.yCenter;
        const radius = next ? fog.nextRadius : fog.radius;

        const fogCenterIndex = coordinateToIndex(map.length, xCenter, yCenter);
        return calculateDistance(map.length, fogCenterIndex, field) > radius;
    }

    return (
        <div>
        <table className="grid">
            <tbody>
                {createTableRows()}
                <Menu
                    id="interactionMenu"
                    anchorEl={menuAnchor}
                    keepMounted
                    open={Boolean(menuAnchor)}
                    onClose={handleClose}
                >
                    {menuAnchor && isShip(menuAnchor.id) && 
                    <React.Fragment>
                    <MenuItem onClick={() => moveTo('up')}>Up</MenuItem>
                    <MenuItem onClick={() => moveTo('down')}>Down</MenuItem>
                    <MenuItem onClick={() => moveTo('left')}>Left</MenuItem>
                    <MenuItem onClick={() => moveTo('right')}>Right</MenuItem>
                    </React.Fragment>}
                    {menuAnchor && !isShip(menuAnchor.id) && !isIsland(menuAnchor.id) &&
                    <MenuItem onClick={() => attack(menuAnchor!.id)}>Attack</MenuItem>}
                    {menuAnchor && !isShip(menuAnchor.id) && isIsland(menuAnchor.id) &&
                    <MenuItem onClick={() => loot(menuAnchor!.id)}>Loot</MenuItem> }
                    {menuAnchor && isShip(menuAnchor.id) && props.inventory.find(item => item.id === 0) &&
                    <MenuItem onClick={() => utilizeItem(0, menuAnchor!.id)}>Protect Ship</MenuItem>}
                    {menuAnchor && isShip(menuAnchor.id) && props.inventory.find(item => item.id === 1) &&
                    <MenuItem onClick={() => utilizeItem(1, menuAnchor!.id)}>Increase Shots</MenuItem>}
                </Menu>
            </tbody>
        </table>
        {availableRes != null && 
        <h3>Available shots or moves with this ship: {availableRes}</h3>}
        </div>
    );
}

export default TwoDBattleground;