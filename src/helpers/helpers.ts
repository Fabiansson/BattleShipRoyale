export function getCoordinates(size: number, index: number) {
    let colSize = Math.sqrt(size);
    return [Math.round(((index / colSize) % 1) * colSize), Math.floor(index / colSize), ];
}

export function coordinateToIndex(size: number, x: number, y: number) {
  let colSize = Math.sqrt(size);
  return x + colSize * y;
}

export function calculateDistance(array: number[], index: number, point: number){
  let size = array.length;

   let origin = getCoordinates(size, index);
   let goal = getCoordinates(size, point);
   
   return Math.hypot(origin[0]-goal[0], origin[1]-goal[1]);
 }
 
 /*function getCoordinates(array, index) { 
   return [Math.floor(index / size), Math.round(((index/size) % 1) * size) ];
 }*/
 
 export function splitArray(array, parts) {
     var tmp = [];
     for(var i = 0; i < array.length; i += parts) {
         tmp.push(array.slice(i, i + parts));
     }
     return tmp;
 }

 export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}