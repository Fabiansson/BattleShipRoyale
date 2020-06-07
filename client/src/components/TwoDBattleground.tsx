import React, { useState, useContext } from "react";
import './TwoDBattleground.css';
import { Ship, HitCoordinates } from "../App";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SocketContext from "../services/SocketProvider";

interface TwoDBattlegroundProps {
    terrain: number[],
    ships: Ship[],
    hits: HitCoordinates[]
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
    const socket = useContext(SocketContext);
    const [selected, setSelected] = useState<string>('');
    const [menuAnchor, setMenuAnchor] = useState<HTMLTableCellElement | null>(null);
    let mapSize: number = 0;

    const createTableRows = () => {
        let mapData: number[] = [...props.terrain];

        mapSize = Math.floor(Math.sqrt(mapData.length));

        props.ships.forEach(ship => {
            ship.position.forEach(field => {
                let fieldNumber: number = getFieldFromCoordinates(mapSize, field.x, field.y);
                if (field.health === 1){
                    mapData[fieldNumber] = 3;
                } else {
                    mapData[fieldNumber] = 4;
                }
            })
        })

        let table = []
        for (let i = 0; i < mapSize; i++) {
            let cols = []
            for (let j = 0; j < mapSize; j++) {
                ;
                let tileNumber: string = (j + mapSize * i).toString(10);
                cols.push(<td id={tileNumber} key={tileNumber} className={getBackground(tileNumber, mapData)} onClick={handleClick}>
                </td>)
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
                let fieldNumber: number = getFieldFromCoordinates(mapSize, field.x, field.y);
                if (fieldNumber === parseInt(tileNumber)) {
                    console.log('Is ship');
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


    const getFieldFromCoordinates = (mapSize: number, x: number, y: number) => {
        return x + (mapSize * y);
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