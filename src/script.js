// import handleGenerateBoard from "./script/functions/handleGenerateBoard.js";
// import handleKeyPress from "./script/functions/handleKeyPress.js";
// import { controlBtns, sound } from "./script/global/elements.js";
// import {
//   W,
//   A,
//   S,
//   D,
//   M,
//   topKey,
//   bottomKey,
//   leftKey,
//   rightKey,
// } from "./script/global/keys.js";
// import preferences from "./script/global/preferences.js";
// import { mute } from "./script/global/variables.js";
import "./style.css";
// import TROPHY_SRC from "./assets/1st-place.png";
// import {
//   handleFetchRecords,
//   mode,
//   setMode,
// } from "./script/global/leaderboard.js";
import Game from "./script/classes/Game.js";

// sound.addEventListener("click", () => {
//   console.log("hello");
//   mute.isMuted = !mute.isMuted;
//   sound.classList.toggle("sound--muted");
// });

// controlBtns.forEach((control, index) => {
//   control.addEventListener("touchstart", () => {
//     control.classList.add("control--pressed");
//   });

//   control.addEventListener("touchend", () => {
//     const controls = ["W", "S", "A", "D"];

//     control.classList.remove("control--pressed");

//     handleKeyPress({ key: controls[index] });
//   });

//   control.addEventListener("mousedown", () => {
//     control.classList.add("control--pressed");
//   });

//   control.addEventListener("mouseup", () => {
//     const controls = ["W", "S", "A", "D"];

//     control.classList.remove("control--pressed");

//     handleKeyPress({ key: controls[index] });
//   });
// });

// let key;

// document.addEventListener("keydown", (e) => {
//   if (document.activeElement.tagName === "INPUT") return;

//   let keyCode = e.keyCode || e.key || e.keyIdentifier;

//   switch (keyCode) {
//     case W:
//     case topKey:
//       controlBtns[0].classList.add("control--pressed");
//       break;
//     case S:
//     case bottomKey:
//       controlBtns[1].classList.add("control--pressed");

//       break;
//     case A:
//     case leftKey:
//       controlBtns[2].classList.add("control--pressed");

//       break;
//     case D:
//     case rightKey:
//       controlBtns[3].classList.add("control--pressed");

//       break;

//     default:
//       break;
//   }
// });

// document.addEventListener("keyup", (e) => {
//   if (document.activeElement.tagName === "INPUT") return;

//   let keyCode = e.keyCode || e.key || e.keyIdentifier;

//   controlBtns.forEach((control) =>
//     control.classList.remove("control--pressed")
//   );

//   switch (keyCode) {
//     case W:
//     case topKey:
//       key = "W";

//       break;
//     case S:
//     case bottomKey:
//       key = "S";

//       break;
//     case A:
//     case leftKey:
//       key = "A";

//       break;
//     case D:
//     case rightKey:
//       key = "D";

//       break;
//     case M:
//       key = "M";

//       break;

//     default:
//       return;
//   }

//   handleKeyPress({ key });
// });

// selection.addEventListener("change", (e) => {
//   setMode(e.target.value);
//   localStorage.setItem("leaderboard-mode", e.target.value);
//   handleFetchRecords({ from: 0 });
// });

// const trophy = document.querySelector("[data-trophy]");

document.addEventListener("DOMContentLoaded", () => {
  // TODO: fetch records using handleFetchRecords() function, push the records into the table and then generate the leaderboard

  // handleFetchRecords({ from: 0 });

  console.log("loading game...");

  const game = new Game();

  // trophy.src = TROPHY_SRC;
  // handleGenerateBoard();
});
