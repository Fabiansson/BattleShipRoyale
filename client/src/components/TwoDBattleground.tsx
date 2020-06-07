import React, { useState, useContext } from "react";
import './TwoDBattleground.css';
import { Ship, Fog, Hit } from "../App";

import { useSnackbar } from 'notistack';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SocketContext from "../services/SocketProvider";
import { coordinateToIndex, calculateDistance } from "../services/helpers";

interface TwoDBattlegroundProps {
    terrain: number[],
    fog: Fog
    ships: Ship[],
    hits: Hit[]
}

export interface Move {
    from: number,
    to: string
}

export interface Attack {
    from: number,
    to: number
}

function TwoDBattleground(props: TwoDBattlegroundProps) {
    const { enqueueSnackbar } = useSnackbar();
    const socket = useContext(SocketContext);
    const [selected, setSelected] = useState<string>('');
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
                } else {
                    mapData[fieldNumber] = 4;
                }
            })
        })

        props.hits.forEach(hit => {
            let fieldNumber: number = coordinateToIndex(mapSize, hit.x, hit.y);
            mapData[fieldNumber] = 2;
        })

        let table = []
        for (let i = 0; i < mapWidth; i++) {
            let cols = []
            for (let j = 0; j < mapWidth; j++) {
                let tileNumber: number = j + mapWidth * i;
                let tileNumberS: string = tileNumber.toString(10);
                if(!isInFog(props.terrain, props.fog, tileNumber)) {
                    cols.push(<td id={tileNumberS} key={tileNumberS} className={getBackground(tileNumberS, mapData)} onClick={handleClick}></td>);
                } else {
                    cols.push(<td id={tileNumberS} key={tileNumberS} className={'tile-5'} onClick={handleFogClick}></td>);
                }
            }
            table.push(<tr className={'roow-' + i} key={i}>{cols}</tr>)
        }

        return table
    }

    const handleClick = (event: any) => {
        if (isShip(event.target.id)) {
            if (selected === event.target.id) {
                setSelected('');
                return;
            }
            setSelected(event.target.id);
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
    }

    const loot = (anchor: string) => {
        let loot: Attack = { from: parseInt(selected), to: parseInt(anchor) }
        socket?.emit('loot', loot);
        setMenuAnchor(null);
        setSelected('');
    }

    const moveTo = (direction: string) => {
        let move: Move = { from: parseInt(selected), to: direction }
        socket?.emit('moveTo', move);
        setMenuAnchor(null);
        setSelected('');
    }

    const isShip = (tileNumber: string) => {
        let isShip = false;
        props.ships.forEach(ship => {
            ship.position.forEach(field => {
                let fieldNumber: number = coordinateToIndex(mapSize, field.x, field.y);
                if (fieldNumber === parseInt(tileNumber)) {
                    isShip = true;
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

    function isInFog(map: number[], fog: Fog, field: number) {
        const fogCenterIndex = coordinateToIndex(map.length, fog.xCenter, fog.yCenter);
        return calculateDistance(map.length, fogCenterIndex, field) > fog.radius;
    }


    return (
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
                </Menu>
            </tbody>
        </table>
    );
}

export default TwoDBattleground;