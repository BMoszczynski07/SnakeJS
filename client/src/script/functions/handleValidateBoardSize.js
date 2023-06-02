import { sizeRange } from "../global/variables.js";

const handleValidateBoardSize = () => {
  let size;

  while (!size || size < sizeRange.min || size > sizeRange.max) {
    const input = prompt(
      `Podaj wielkość planszy (minimalna - ${sizeRange.min}, maksymalna - ${sizeRange.max}):`
    );
    size = parseInt(input);

    if (!size || size < sizeRange.min || size > sizeRange.max) {
      alert("Wprowadź poprawną wartość!");
    }
  }

  return size;
};

export default handleValidateBoardSize;
