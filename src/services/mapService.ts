import { GeneralGameState, GameSettings, ServerGameState, PlayerGameState } from 'interfaces/interfaces';


let amaountPlayer:number = 3;
export function createTerrain(amaountPlayer){
    
        const cols = 10;
        const rows = 10;
        const islands = 3;
         var tiles = [];
         var islandCenterpoints = [];
         
         for(let y=0;y<rows;y++) {
            for (let x=0;x<cols;x++) {
               var t = 0;
            
               tiles.push(t);   
            }
           }
          console.log(tiles.length);
         for(let i=0; i<islands; i++){
           const centerIndex = Math.floor(Math.random() * tiles.length);
           islandCenterpoints.push(centerIndex);
           tiles[centerIndex] = 1;
       
           console.log(islandCenterpoints);
         }
         
         console.log(tiles)
     
       
    }