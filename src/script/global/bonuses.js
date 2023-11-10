import handlePlaceTile from "../functions/handlePlaceTile.js";

import speed2XImg from "../../assets/SPEED2X.png";
import speed2XAudio from "../../assets/SPEED2X.wav";
import speed2XImgLower from "../../assets/SPEED 2Xlower.png";
import speed2XAudioLower from "../../assets/SPEED 2Xlower.wav";
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
    img: speed2XImgLower,
    audio: speed2XAudioLower,
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

export const handleGenerateBonuses = () => {
  const rand = this.Rand.GetInteger({
    min: 0,
    max: 100,
  });

  const chosenBonuses = [
    ...bonusesProbabilities.filter((bonus) => bonus.probability >= rand),
  ];

  for (const bonus of chosenBonuses) {
    handlePlaceTile({
      mode: "bonus",
      bonus: {
        name: bonus.name,
        imgPATH: bonusFiles[bonus.name].img,
        audioPATH: bonusFiles[bonus.name].audio,
      },
    });
  }
};

export const bonusesProbabilities = [
  {
    name: "SPEED 2X",
    // probability: 70,
    probability: 100,
  },
  {
    name: "SPEED /2X",
    // probability: 20,
    probability: 100,
  },
  {
    name: "Freeze",
    // probability: 60,
    probability: 100,
  },
  {
    name: "Bombs",
    // probability: 100,
    probability: 100,
  },
  {
    name: "Nystagmus",
    // probability: 15,
    probability: 100,
  },
  {
    name: "+5 points",
    // probability: 25,
    probability: 100,
  },
  {
    name: "-5 points",
    // probability: 80,
    probability: 100,
  },
];
