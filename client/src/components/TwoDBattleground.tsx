import React, { useState } from "react";
import './TwoDBattleground.css';
import { Ship, HitCoordinates } from "../App";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface TwoDBattlegroundProps {
    terrain: number[],
    ships: Ship[],
    hits: HitCoordinates[]
}

function TwoDBattleground(props: TwoDBattlegroundProps) {
    const [selected, setSelected] = useState<string>('');
    const [moveFields, setMoveFields] = useState<number[]>([]);
    const [menuAnchor, setMenuAnchor] = useState<HTMLTableCellElement | null>(null);
    let mapSize: number = 0;

    const createTableRows = () => {
        let mapData: number[] = props.terrain;

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
                cols.push(<td id={tileNumber} key={tileNumber} className={getBackground(tileNumber)} onClick={handleClick}>
                </td>)
            }
            table.push(<tr className={'roow-' + i} key={i}>{cols}</tr>)
        }

        return table
    }

    const select = (tileNumber: string) => {
        if (isShip(tileNumber)) {
            getMoveFields(parseInt(tileNumber));
            setSelected(tileNumber);

        } else {
            setMoveFields([]);
            setSelected('');
        }
    }

    const handleClick = (event: any) => {
        if (isShip(event.target.id)) {
            if(selected === event.target.id) {
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
            console.log(event.currentTarget.id);
        }
    }

    const handleClose = () => {
        setMenuAnchor(null);
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

    const getBackground = (tileNumber: string) => {
        if (selected === tileNumber) {
            return 'selected';
        } else if (menuAnchor && menuAnchor.id === tileNumber) {
            return 'aimed';
        } else if (moveFields.includes(parseInt(tileNumber))) {
            return 'moveOption';
        }
        return 'tile-' + props.terrain[parseInt(tileNumber)];
    }


    const getFieldFromCoordinates = (mapSize: number, x: number, y: number) => {
        return x + (mapSize * y);
    }

    const getMoveFields = (tileNumber: number) => {
        let mapData: number[] = props.terrain;

        const size: number = Math.floor(Math.sqrt(mapData.length));

        let sourroundingFields = [tileNumber + 1, tileNumber - 1, tileNumber + size, tileNumber - size, tileNumber + size + 1, tileNumber + size - 1, tileNumber - size + 1, tileNumber - size - 1];

        let moveFields: number[] = [];

        sourroundingFields.forEach(number => {
            if (number >= 0 && number < mapData.length && mapData[number] === 0) {
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
                    <MenuItem onClick={handleClose}>Attack</MenuItem>
                    {menuAnchor && moveFields.includes(parseInt(menuAnchor.id)) && 
                    <MenuItem onClick={handleClose}>Move To</MenuItem>}
                </Menu>
            </tbody>
        </table>
    );
}

export default TwoDBattleground;