import board from './board.js';
import { coordinates } from './interfaces/coordinates.js';
import { position } from './interfaces/position.js';

export class Robot {
  private position: position;

  constructor() {
    this.position = {
      x: null,
      y: null,
      direction: null
    };
  }

  public place(params: string) {
    const paramsArray = params?.split(',');
    if (paramsArray?.length !== 3) return '[!] cannot place: invalid position.';

    const newPosition = {
      x: Number(paramsArray[0]),
      y: Number(paramsArray[1]),
      direction: paramsArray[2],
    }
    return board.isPositionValid(newPosition.x, newPosition.y, newPosition.direction)
    ? this.setPosition(newPosition)
    : '[!] cannot place: invalid position.';
  }

  public left() {
    if (!board.isPlaced(this.position)) return '[!] robot must be placed before turning.';
    const newPosition = { ...this.position };

    switch (this.position.direction) {
      case 'NORTH':
        newPosition.direction = coordinates['WEST'];
        break;
      case 'EAST':
        newPosition.direction = coordinates['NORTH'];
        break;
      case 'SOUTH':
        newPosition.direction = coordinates['EAST'];
        break;
      case 'WEST':
        newPosition.direction = coordinates['SOUTH'];
        break;
    }

    this.setPosition(newPosition);
  }

  public right() {
    if (!board.isPlaced(this.position)) return '[!] robot must be placed before turning.';
    const newPosition = { ...this.position };

    switch (this.position.direction) {
      case 'NORTH':
        newPosition.direction = coordinates['EAST'];
        break;
      case 'EAST':
        newPosition.direction = coordinates['SOUTH'];
        break;
      case 'SOUTH':
        newPosition.direction = coordinates['WEST'];
        break;
      case 'WEST':
        newPosition.direction = coordinates['NORTH'];
        break;
    }

    this.setPosition(newPosition);
  }

  public move() {
    if (!board.isPlaced(this.position)) return '[!] robot must be placed before moving.';
    const newPosition = { ...this.position };

    switch (this.position.direction) {
      case 'NORTH':
        newPosition.x--;
        break;
      case 'EAST':
        newPosition.y++;
        break;
      case 'SOUTH':
        newPosition.x++;
        break;
      case 'WEST':
        newPosition.y--;
        break;
    }
    
    return board.isPositionValid(newPosition.x, newPosition.y, newPosition.direction) 
    ? this.setPosition(newPosition)
    : `[!] robot is at the border, can't move further.`;
  }

  public report() {
    if (!board.isPlaced(this.position)) return 'robot is not placed yet.'
    return `${this.position.x},${this.position.y},${this.position.direction}`
  }

  private setPosition({ x, y, direction }: { x: number, y: number, direction: string }): string | null {
    this.position = { x, y, direction: coordinates[direction as keyof typeof coordinates] };
    return null;
  }
}
