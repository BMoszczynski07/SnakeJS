import { bonuses } from "../global/bonuses.js";
import { board, mute, snake } from "../global/variables.js";
import handleBonus from "./handleBonus.js";

const handleBonusIsEaten = () => {
  let selectedBonus;

  bonuses.map((bonus, index) => {
    if (bonus.x === snake.class.x && bonus.y === snake.class.y)
      selectedBonus = { bonus, index };
  });

  if (selectedBonus) {
    const { bonus: foundBonus, index } = selectedBonus;

    clearInterval(bonuses[index].boostInterval);

    console.log("eaten -> snake ate bonus");
    const foundTile = board[foundBonus.y][foundBonus.x];

    foundTile.classList.remove("tile--boost");
    foundTile.style.backgroundImage = "";

    console.log(bonuses);
    bonuses.splice(index, 1);
    console.log(bonuses);

    handleBonus({ type: foundBonus.name });

    if (!mute.isMuted) {
      const bonus = new Audio();
      bonus.src = foundBonus.audioPATH;
      bonus.play();
    }
  }
};

export default handleBonusIsEaten;
