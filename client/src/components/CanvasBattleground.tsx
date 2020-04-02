import React, { useRef, useEffect, useState } from "react";
import { Ship, HitCoordinates } from "../App";

export interface TileType {
  name: string,
  h: number,
  color: string[]
}

export interface Tile {
  x: number,
  y: number,
  xCenter?: number,
  yCenter?: number,
  type: TileType,
  getColor?: () => string
}

export interface TileTypesObject {
  [key: string]: TileType
}

interface CanvasBattlegroundProps {
  terrain: number[],
  ships: Ship[],
  hits: HitCoordinates[]
}

function CanvasBattleground(props: CanvasBattlegroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [map, setMap] = useState<number[]>(props.terrain);

  const [rows, setRows] = React.useState(10);
  const [cols, setcols] = React.useState(10);
  const [s, setseize] = React.useState(64);

  useEffect(() => {
    console.log('repainting');
    console.log(map);
    /*let tiles = [[0,1,0],[0,2,0],[0,2,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
    [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
    [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
    [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
    [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
    [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
    [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
    [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
    [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
    [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];*/

    let tileTypes: TileTypesObject = {
      '0': { name: 'water', h: .75, color: ['#34a4eb', '#1d9ef0', '#1481c7'] },
      '1': { name: 'land', h: 1, color: ['#f5b32f'] },
      '2': { name: 'clicked', h: 1.2, color: ['red'] },
      '3': { name: 'boat', h: 0.5, color: ['green'] }
    }
    let tiles: number[] = map;

    let eff = []
    let size = Math.round(Math.sqrt(tiles.length));
    for (let i = 0; i < tiles.length; i++) {
      //let key: keyof TileTypesObject = tiles[i];
      let tile: Tile = {
        x: i % size, //x and y should logicaly be swapped but canvas draws like this
        y: Math.floor(i / size),
        type: tileTypes[tiles[i]]
      }
      eff.push(tile);
    }
    /*for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let t: TileType = {
          name: 'grass',
          h: 1,
          color: ['#34a4eb','#1d9ef0','#1481c7']
        };

        let tile: Tile = {
          x: x,
          y: y,
          type: t
        }
        tiles.push(tile);
      }
    }*/

    drawCanvas(eff);
    // eslint-disable-next-line
  }, [map]);

  const drawCanvas = (tiles: Tile[]) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      var image = new Image();

      image.onload = () => {
        ctx?.drawImage(image, 100, 100);
      }
      image.src = 'http://s4.postimage.org/1fxt9xtyc/floor_standard.png';
      if (ctx) {
        let w = window.innerWidth;
        let h = window.innerHeight;
        let devicePixelRatio = window.devicePixelRatio;
        let cw = Math.round(w / 2);
        let ch = Math.round(h / 2);
        canvas.width = w * devicePixelRatio;
        canvas.height = h * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);

        ////DRAW
        const x = cw - (s * (1 + (((cols - 1) - (rows - 1)) * .5))) / 2;
        const y = ch - (s * (1 + (((cols - 1) + (rows - 1)) * .25))) / 2;
        for (let i = 0, l = tiles.length; i < 1; i++) {
          let t = tiles[i];
          let cx = Math.round(x + s * (t.x * .5) - s * (t.y * .5));
          let cy = Math.round(y + s * (t.x * .25) + s * (t.y * .25));
          let oy = (1 - t.type.h) * s / 2;

          t.xCenter = cx + (s * .5);
          t.yCenter = cy + (s * .75) - t.type.h * 32;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(s + cx, s * .75 + cy); //BR
          ctx.lineTo(s * .5 + cx, s + cy); //BB
          ctx.lineTo(0 + cx, s * .75 + cy); //BL
          ctx.lineTo(0 + cx, s * .25 + cy + oy); //TL
          ctx.lineTo(s * .5 + cx, 0 + cy + oy); //TT
          ctx.lineTo(s + cx, s * .25 + cy + oy); //TR
          ctx.closePath();
          ctx.fillStyle = t.type.color[Math.floor(Math.random() * t.type.color.length)];
          ctx.fill();
          ctx.restore();

          /*if (t.type.name === 'boat') {
            console.log('it is a boat');
            ctx.save();
            ctx.beginPath();
            let height = 20;
            
            ctx.moveTo(s + cx * 0.875, s + cy); //oben rechts
            ctx.lineTo(s * 0.625 + cx, s *1.0625  + cy); //BL
            ctx.lineTo(s * .125 + cx, s *0.75 + cy); //TL
            ctx.lineTo(s * .125 + cx,  s*0.6 + cy + oy); //TT
            ctx.lineTo(s * 0.375 + cx, s * 0.53 + cy + oy); //TR
            ctx.lineTo(s + cx * 0.875, s * .8125 + cy); //BR
            ctx.closePath();
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.restore();
          }*/

          ctx.save();
          ctx.beginPath();
          ctx.lineTo(s * .5 + cx, s + cy); //BB
          ctx.lineTo(0 + cx, s * .75 + cy); //BL
          ctx.lineTo(0 + cx, s * .25 + cy + oy); //TL
          ctx.lineTo(s * .5 + cx, s * .5 + cy + oy); //TT
          ctx.closePath();
          ctx.globalAlpha = .1;
          ctx.fillStyle = "black";
          ctx.fill();
          ctx.restore();

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(s + cx, s * .75 + cy); //BR
          ctx.lineTo(s * .5 + cx, s + cy); //BB
          ctx.lineTo(s * .5 + cx, s * .5 + cy + oy); //TT
          ctx.lineTo(s + cx, s * .25 + cy + oy); //TR
          ctx.closePath();
          ctx.globalAlpha = .2;
          ctx.fillStyle = "black";
          ctx.fill();
          ctx.restore();
        }

        var bounds = canvas.getBoundingClientRect();

        canvas.onclick = (event) => {
          for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].xCenter && tiles[i].yCenter) {
              let xCenter = tiles[i].xCenter;
              let yCenter = tiles[i].yCenter;
              var dx = Math.abs(event.pageX + bounds.left - xCenter!);
              var dy = Math.abs(event.pageY - bounds.top - yCenter!);

              if (dx / (64 * 0.5) + dy / (32 * 0.5) <= 1) {
                let newMap = [...map];

                var selected = newMap.indexOf(2);

                if (selected !== -1) {
                  newMap[selected] = 0;
                }
                newMap[i] = 2;
                setMap(newMap);
                //alert('X: ' + tiles[i].x + ' Y: ' + tiles[i].y + " clickX: " + event.pageX + " clickY: " + event.pageY);
                break;
              }
            }
          }
        }
      }

    }
  }

  return (
    <canvas ref={canvasRef} />
  );
}

export default CanvasBattleground;