import React from "react";
import './Battleground.css';

function Battleground() {

    const createTableRows = () => {
        let mapData: number[] = [8, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 5, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        let mapSize = Math.floor(Math.sqrt(mapData.length));
        let table = []

        for (let i = 0; i < mapSize; i++) {
            let cols = []
            for (let j = 0; j < mapSize; j++) {
                let tileNumber: string = "" + i + j;
                console.log(tileNumber);
                cols.push(<td className={'cool-' + j} style={{ transform: 'translateX(' + (j * 4) + 'em)' }}>
                    <div className={'tile'}>
                        <div className={'tile-' + mapData[parseInt(tileNumber)]}></div>
                    </div>
                </td>)
            }
            table.push(<tr className={'roow-' + i} style={{ transform: 'translateY(' + (i * 4) + 'em)' }}>{cols}</tr>)
        }
        return table
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