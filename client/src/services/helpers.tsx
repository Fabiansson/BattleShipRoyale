export function getCoordinates(size: number, index: number) {
    let colSize = Math.sqrt(size);
    return [Math.round(((index / colSize) % 1) * colSize), Math.floor(index / colSize),];
}

export function coordinateToIndex(size: number, x: number, y: number) {
    let colSize = Math.sqrt(size);
    return x + colSize * y;
}

export function calculateDistance(size: number, index: number, point: number) {
    let origin = getCoordinates(size, index);
    let goal = getCoordinates(size, point);

    return Math.hypot(origin[0] - goal[0], origin[1] - goal[1]);
}