import RandInt from "../functions/RandInt.js";
import handlePlaceTile from "../functions/handlePlaceTile.js";

import speed2X from "../../assets/SPEED2X.png";
import Freeze from "../../assets/Freeze.png";

export const bonusImgs = { "SPEED 2X": speed2X, Freeze };

export const bombs = [];

export const bonuses = [];

export const handleGenerateBonuses = () => {
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

export const bonusesProbabilities = [
  {
    name: "SPEED 2X",
    imgPATH: "../../assets/SPEED 2X.png",
    audioPATH: "../assets/SPEED 2X.wav",
    probability: 35,
  },
  {
    name: "SPEED /2X",
    imgPATH: "../assets/SPEED 2X.png",
    audioPATH: "../assets/SPEED 2Xlower.wav",
    probability: 25,
  },
  {
    name: "Freeze",
    imgPATH: "../assets/Freeze.jpg",
    audioPATH: "../assets/Freeze.wav",
    probability: 50,
  },
  {
    name: "Bombs",
    imgPATH: "../assets/Bombs.jpg",
    audioPATH: "../assets/Bombs.wav",
    probability: 20,
  },
  {
    name: "Nystagmus",
    imgPATH: "../assets/Nystagmus.jpg",
    audioPATH: "../assets/Nystagmus.wav",
    probability: 5,
  },
  {
    name: "+5 points",
    imgPATH: "../assets/+5 points.jpg",
    audioPATH: "../assets/+5 points.wav",
    probability: 40,
  },
  {
    name: "-5 points",
    audioPATH: "../assets/-5 points.wav",
    probability: 45,
  },
];
