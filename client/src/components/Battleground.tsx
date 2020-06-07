import React from "react";
import './Battleground.css';
import { Ship, Hit } from "../App";

interface BattlegroundProps {
    terrain: number[],
    ships: Ship[],
    hits: Hit[]
}

function Battleground(props: BattlegroundProps) {
    let mapSize: number = 0;

    const createTableRows = () => {
        let mapData: number[] = props.terrain;

        mapSize = Math.floor(Math.sqrt(mapData.length));
        let table = []

        for (let i = 0; i < mapSize; i++) {
            let cols = []
            for (let j = 0; j < mapSize; j++) {
                let tileNumber: string = "" + i + j;
                cols.push(<td onClick={() => alterTile(tileNumber)} className={'cool-' + j} style={{ transform: 'translateX(' + (j * 4) + 'em)' }}>
                    <div className={'tile'} style={{zIndex: ((1000+i+j)*2)}}>
                        <div className={'tile-' + mapData[parseInt(tileNumber)]} id={tileNumber}></div>
                    </div>
                </td>)
            }
            table.push(<tr className={'roow-' + i} style={{ transform: 'translateY(' + (i * 4) + 'em)' }}>{cols}</tr>)
        }
        return table
    }

    const getTileByCoordinate = (x: number, y: number) => {
        return x + mapSize * y;
    }
    const alterTile = (tileId: string) => {
        console.log('altering tile');
        let el = document.getElementById(tileId);
        if(el) el.className = "tile-8";
    }
    return (
        <table style={{ left: '50%', top: '10%' }}>
            <tbody>
                {createTableRows()}
            </tbody>
        </table>
    );
}

export default Battleground;