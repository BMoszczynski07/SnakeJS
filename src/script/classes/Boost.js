import Board from "./Board.js";

class Boost extends Board {
  bombsInterval = "";

  constructor(x, y, name = "") {
    this.name = name;
    this.x = x;
    this.y = y;
  }
}

export default Boost;
