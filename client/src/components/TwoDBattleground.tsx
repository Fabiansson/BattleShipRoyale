import React, { useState } from "react";
import './TwoDBattleground.css';
import { Ship, HitCoordinates } from "../App";

interface TwoDBattlegroundProps {
    terrain: number[],
    ships: Ship[],
    hits: HitCoordinates[]
}

function TwoDBattleground(props: TwoDBattlegroundProps) {
    const [selected, setSelected] = useState<string>('');
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
                cols.push(<td className={selected === tileNumber ? 'clicked' : 'tile-' + mapData[parseInt(tileNumber)]} onClick={() => setSelected(tileNumber)}>
                </td>)
            }
            table.push(<tr className={'roow-' + i}>{cols}</tr>)
        }
        
        return table
    }

    const getFieldFromCoordinates = (mapSize: number, x: number, y: number) => {
        return x + (mapSize * y);
    }
    
    return (
        <table className="grid">
            <tbody>
                {createTableRows()}
            </tbody>
        </table>
    );
}

export default TwoDBattleground;