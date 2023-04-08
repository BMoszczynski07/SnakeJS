import RandInt from "../functions/RandInt.js";
import handlePlaceTile from "../functions/handlePlaceTile.js";

import speed2XImg from "../../assets/SPEED2X.png";
import speed2XAudio from "../../assets/SPEED2X.wav";
import FreezeImg from "../../assets/Freeze.png";
import FreezeAudio from "../../assets/Freeze.mp3";
import BombsImg from "../../assets/Bombs.png";
import BombsWAV from "../../assets/bombs.wav";
import Plus5PointsWAV from "../../assets/+5 points.wav";
import Minus5PointsWAV from "../../assets/-5 points.wav";
import Plus5PointsPNG from "../../assets/+5 points.png";
import Minus5PointsPNG from "../../assets/-5 points.png";
import NystagmusPNG from "../../assets/Nystagmus.png";
import NystagmusWAV from "../../assets/nystagmus.wav";

export const bonusFiles = {
  "SPEED 2X": {
    img: speed2XImg,
    audio: speed2XAudio,
  },
  "SPEED /2X": {
    img: speed2XImg,
    audio: speed2XAudio,
  },
  Freeze: {
    img: FreezeImg,
    audio: FreezeAudio,
  },
  Bombs: {
    img: BombsImg,
    audio: BombsWAV,
  },
  Nystagmus: {
    img: NystagmusPNG,
    audio: NystagmusWAV,
  },
  "+5 points": {
    img: Plus5PointsPNG,
    audio: Plus5PointsWAV,
  },
  "-5 points": {
    img: Minus5PointsPNG,
    audio: Minus5PointsWAV,
  },
};

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
    probability: 35,
  },
  {
    name: "SPEED /2X",
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
