import RandInt from "../functions/RandInt.js";
import Boost from "./Boost.js";

class Bonus extends Boost {
  bombsState = true;

  constructor(x, y, name, bonusID, imgPATH, audioPATH) {
    super(x, y, name);
    this.bonusID = bonusID;
    this.imgPATH = imgPATH;
    this.audioPATH = audioPATH;

    const intervalRange =
      (interval.val *
        RandInt({
          min: 10,
          max: 200,
        })) /
      100;

    this.boostInterval = setInterval(this.handleBonusTranslate, intervalRange);
  }

  handleBonusTranslate = () => {
    // TODO: bonus translation, check whether the bonus has reached the bottom of the board, if so - delete this bonus from bonuses using this.bonusID
    if (!this.gameStarted) {
      clearInterval(this.boostInterval);
      return;
    }
    this.board[this.y][this.x].classList.remove("tile--boost");
    this.board[this.y][this.x].style.backgroundImage = "";
    this.y++;

    if (this.x === this.snake.x && this.y === this.snake.y) {
      clearInterval(this.boostInterval);
      console.log("eaten -> bonus ate snake");

      const foundBonusID = this.bonuses.findIndex(
        (bns) => bns.bonusID === this.bonusID
      );

      this.bonuses.splice(foundBonusID, 1);

      this.handleBonus({ type: this.name });

      if (!mute.isMuted) {
        const bonus = new Audio();
        bonus.src = this.audioPATH;
        bonus.play();
      }
      return;
    }

    if (this.y === boardSize) {
      const foundBonusID = bonuses.findIndex(
        (bns) => bns.bonusID === this.bonusID
      );
      clearInterval(this.boostInterval);
      bonuses.splice(foundBonusID, 1);
      return;
    }

    board[this.y][this.x].classList.add("tile--boost");
    board[this.y][this.x].style.backgroundImage = `url('${
      bonusFiles[this.name].img
    }')`;
  };

  handleBonus = ({ type }) => {
    let snakePosLen;

    switch (type) {
      case "Nystagmus":
        this.preferences.handleNystagmus();
        break;
      case "+5 points":
        setTimeout(() => {
          for (let i = 0; i < this.snakePositions.length; i++) {
            let { x, y } = this.snakePositions[i];
            if (this.board[y][x].classList.contains("tile--snake-added-point"))
              this.board[y][x].classList.remove("tile--snake-added-point");
            else break;
          }
        }, 500);

        snakePosLen = this.snakePositions.length;

        for (let i = 0; i < snakePosLen; i++) {
          const { x: nextX, y: nextY } = this.snakePositions[0];
          const nextElem = this.board[nextY][nextX];
          if (nextElem.classList.contains("tile--snake-subtracted-point")) {
            nextElem.classList.remove("tile--snake-subtracted-point");
            nextElem.classList.remove("tile--snake");
            this.snakePositions.shift();
            this.snake.length--;
          } else break;
        }

        for (let i = 0; i < 5; i++) {
          const newCoordinates = this.handleFoodEaten();

          if (!this.gameStarted) return;

          if (newCoordinates) {
            const { newX, newY } = newCoordinates;

            this.snake.length++;
            this.handleDisplay({ snakeLength: this.snake.length });
            this.snakePositions.unshift({ x: newX, y: newY });
            this.board[newY][newX].classList.add("tile--snake");
            this.board[newY][newX].classList.add("tile--snake-added-point");
          }
        }
        break;
      case "-5 points":
        setTimeout(() => {
          let snakePosLen = this.snakePositions.length;
          for (let i = 0; i < snakePosLen; i++) {
            const { x: nextX, y: nextY } = this.snakePositions[0];
            const nextElem = this.board[nextY][nextX];
            if (nextElem.classList.contains("tile--snake-subtracted-point")) {
              nextElem.classList.remove("tile--snake-subtracted-point");
              nextElem.classList.remove("tile--snake");
              this.snakePositions.shift();
              this.snake.length--;
              this.handleDisplay({ snakeLength: snake.class.length });
            } else break;
          }
        }, 500);

        for (let i = 0; i < 5; i++) {
          const { x: nextX, y: nextY } = this.snakePositions[i];

          if (
            this.board[nextY][nextX].classList.contains(
              "tile--snake-added-point"
            )
          ) {
            this.board[nextY][nextX].classList.remove(
              "tile--snake-added-point"
            );
            this.board[nextY][nextX].classList.add(
              "tile--snake-subtracted-point"
            );
          } else {
            if (i === this.snakePositions.length - 1) break;
            else
              this.board[nextY][nextX].classList.add(
                "tile--snake-subtracted-point"
              );
          }
        }
        break;
      case "Bombs":
        navigator.vibrate(100);
        if (this.bombsInterval === "")
          this.bombsInterval = setInterval(() => {
            this.bombsState = !this.bombsState;

            console.log("interval");

            this.preferences.root.style.setProperty(
              "--bomb-color",
              this.bombsState ? "#000" : "#f00"
            );
          }, 250);

        for (let i = 0; i < Math.floor(this.boardSize * (2 / 5)); i++) {
          this.handlePlaceTile({ mode: "bomb" });
        }
        break;
      default:
        console.error("#ERR -> Nieznany typ bonusu!");
        break;
    }
  };
}

export default Bonus;
