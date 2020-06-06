export function getCoordinates(size: number, index: number) {
    let colSize = Math.sqrt(size);
    return [Math.round(((index / colSize) % 1) * colSize), Math.floor(index / colSize), ];
}

export function coordinateToIndex(size: number, x: number, y: number) {
  let colSize = Math.sqrt(size);
  return x + colSize * y;
}