import RandInt from "../functions/RandInt";
import handlePlaceTile from "../functions/handlePlaceTile";

export const bonuses = [];

export const bonusesProbabilities = [
  {
    name: "SPEED 2X",
    probability: 35,
  },
  {
    name: "SPEED /2",
    probability: 25,
  },
  {
    name: "Freeze",
    probability: 50,
  },
  {
    name: "Bombs",
    probability: 20,
  },
  {
    name: "Nystagmus",
    probability: 5,
  },
  {
    name: "+5 points",
    probability: 40,
  },
  {
    name: "-5 points",
    probability: 45,
  },
];

export const generateBonuses = () => {
  const rand = RandInt({
    min: 0,
    max: 100,
  });

  const chosenBonuses = [
    ...bonusesProbabilities.filter((bonus) => bonus.probability > rand),
  ];

  for (const bonus of chosenBonuses) {
    handlePlaceTile({ mode: "bonus", bonus });
  }
};
