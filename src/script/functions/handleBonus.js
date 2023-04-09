import preferences from "../global/preferences.js";

const handleBonus = ({ type }) => {
  switch (type) {
    case "Nystagmus":
      preferences.board.handleNystagmus();
      break;
    default:
      console.error("#ERR -> Nieznany typ bonusu!");
      break;
  }
};

export default handleBonus;
