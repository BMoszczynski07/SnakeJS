class Snake {
  constructor(direction, length, speed, x, y, jumps = 0) {
    this.direction = direction;
    this.length = length;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.jumps = jumps;
  }
}

export default Snake;
