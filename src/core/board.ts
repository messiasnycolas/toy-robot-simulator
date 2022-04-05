import { position } from './interfaces/position.js';
import { coordinates } from './interfaces/coordinates.js';

class Board {
  isPositionValid(x: number, y: number, direction: string) {
    switch (true) {
      case (isNaN(x) || !Number.isInteger(x)):
      case (isNaN(y) || !Number.isInteger(y)):
      case (x > 4 || x < 0):
      case (y > 4 || y < 0):
      case (!coordinates[direction as keyof typeof coordinates]):
        return false;
      default:
        return true;
    }
  }

  isPlaced(position: position): boolean {
    if (
      position.x === null
      || position.y === null
      || position.direction === null
    ) return false;

    return true;
  }
}

export default new Board();