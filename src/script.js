import Preferences from "./script/classes/Preferences.js";
import handleGenerateBoard from "./script/functions/handleGenerateBoard.js";
import handleKeyPress from "./script/functions/handleKeyPress.js";
import { currentTheme } from "./script/global/CSSroot.js";
import { controlBtns, sound } from "./script/global/elements.js";
import {
  W,
  A,
  S,
  D,
  M,
  topKey,
  bottomKey,
  leftKey,
  rightKey,
} from "./script/global/keys.js";
import preferences from "./script/global/preferences.js";
import { mute } from "./script/global/variables.js";
import "./style.css";

sound.addEventListener("click", () => {
  mute.isMuted = !mute.isMuted;
  sound.classList.toggle("sound--muted");
});

controlBtns.forEach((control, index) => {
  control.addEventListener("mousedown", () => {
    control.classList.add("control--pressed");
  });

  control.addEventListener("mouseup", () => {
    const controls = ["W", "S", "A", "D"];

    control.classList.remove("control--pressed");

    handleKeyPress({ key: controls[index] });
  });
});

let key;

document.addEventListener("keydown", (e) => {
  let keyCode = e.keyCode || e.key || e.keyIdentifier;

  switch (keyCode) {
    case W:
    case topKey:
      controlBtns[0].classList.add("control--pressed");
      break;
    case S:
    case bottomKey:
      controlBtns[1].classList.add("control--pressed");

      break;
    case A:
    case leftKey:
      controlBtns[2].classList.add("control--pressed");

      break;
    case D:
    case rightKey:
      controlBtns[3].classList.add("control--pressed");

      break;

    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  let keyCode = e.keyCode || e.key || e.keyIdentifier;

  controlBtns.forEach((control) =>
    control.classList.remove("control--pressed")
  );

  switch (keyCode) {
    case W:
    case topKey:
      key = "W";

      break;
    case S:
    case bottomKey:
      key = "S";

      break;
    case A:
    case leftKey:
      key = "A";

      break;
    case D:
    case rightKey:
      key = "D";

      break;
    case M:
      key = "M";

      break;

    default:
      return;
      break;
  }

  handleKeyPress({ key });
});

document.addEventListener("DOMContentLoaded", () => {
  preferences.set({
    payload: new Preferences({
      boardColor: currentTheme.boardColor,
      textColor: currentTheme.textColor,
      tileColor: currentTheme.tileColor,
      foodColor: currentTheme.foodColor,
      background: currentTheme.background,
      snakeColor: currentTheme.snakeColor,
    }),
  });
  handleGenerateBoard();
});
