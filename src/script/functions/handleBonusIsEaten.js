import { bonusFiles, bonuses } from "../global/bonuses.js";
import { board, snake } from "../global/variables.js";
import { bonus } from "./handleInitializeAudio.js";

const handleBonusIsEaten = () => {
  const foundBonus = bonuses.find(
    (bonus) => bonus.x === snake.class.x && bonus.y === snake.class.y
  );

  if (foundBonus) {
    bonuses.filter((bonus) => bonus.bonusID !== foundBonus.bonusID);
    const foundTile = board[foundBonus.y][foundBonus.x];

    foundTile.classList.remove("tile--boost");
    foundTile.style.backgroundImage = "";

    clearInterval(bonuses[foundBonus.bonusID].boostInterval);

    bonus.src = bonusFiles[foundBonus.name].audio;
    bonus.play();

    // TODO: react to picking up a bonus for example adding  bombs or increasing speed

    if (foundBonus) return true;
    return false;
  }
};

export default handleBonusIsEaten;
