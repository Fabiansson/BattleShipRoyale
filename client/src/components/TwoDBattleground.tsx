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
    to: number
}

function TwoDBattleground(props: TwoDBattlegroundProps) {
    const socket = useContext(SocketContext);
    const [selected, setSelected] = useState<string>('');
    const [moveFields, setMoveFields] = useState<number[]>([]);
    const [menuAnchor, setMenuAnchor] = useState<HTMLTableCellElement | null>(null);
    let mapSize: number = 0;

    const createTableRows = () => {
        let mapData: number[] = [...props.terrain];

        mapSize = Math.floor(Math.sqrt(mapData.length));

        props.ships.forEach(ship => {
            ship.position.forEach(field => {
                let fieldNumber: number = getFieldFromCoordinates(mapSize, field.x, field.y);
                mapData[fieldNumber] = 3;
            })
        })

        let table = []
        for (let i = 0; i < mapSize; i++) {
            let cols = []
            for (let j = 0; j < mapSize; j++) {
                let tileNumber: string = "" + i + j;
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
                setMoveFields([]);
                return;
            }
            setSelected(event.target.id);
            getMoveFields(parseInt(event.target.id));
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
        let attack: Move = { from: parseInt(selected), to: parseInt(anchor) }
        socket?.emit('attack', attack);
        setMenuAnchor(null);
        setSelected('');
        setMoveFields([]);
    }

    const moveTo = (anchor: string) => {
        let move: Move = { from: parseInt(selected), to: parseInt(anchor) }
        socket?.emit('moveTo', move);
        setMenuAnchor(null);
        setSelected('');
        setMoveFields([]);
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

    const getBackground = (tileNumber: string, map: number[]) => {
        if (selected === tileNumber) {
            return 'selected';
        } else if (menuAnchor && menuAnchor.id === tileNumber) {
            return 'aimed';
        } else if (moveFields.includes(parseInt(tileNumber))) {
            return 'moveOption';
        }
        return 'tile-' + map[parseInt(tileNumber)];
    }


    const getFieldFromCoordinates = (mapSize: number, x: number, y: number) => {
        return x + (mapSize * y);
    }

    const getMoveFields = (tileNumber: number) => {
        let mapData: number[] = props.terrain;

        let sourroundingFields = [tileNumber + 1, tileNumber - 1, tileNumber + mapSize, tileNumber - mapSize];

        let moveFields: number[] = [];
 
        ///// VERY CONFUSING
        sourroundingFields.forEach(number => {
            if (number >= 0 && number < mapData.length && mapData[number] === 0) {
                if ((number === tileNumber + 1) && (number > (Math.ceil((tileNumber + 0.001) / mapSize) * mapSize) - 1)) {
                    return
                } else if ((number === tileNumber - 1) && !((number / mapSize) >= Math.floor(tileNumber / mapSize))) {
                    return
                }
                moveFields.push(number);
            }
        })

        setMoveFields(moveFields);
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
                    <MenuItem onClick={() => attack(menuAnchor!.id)}>Attack</MenuItem>
                    {menuAnchor && moveFields.includes(parseInt(menuAnchor.id)) &&
                        <MenuItem onClick={() => moveTo(menuAnchor.id)}>Move To</MenuItem>}
                </Menu>
            </tbody>
        </table>
    );
}

export default TwoDBattleground;