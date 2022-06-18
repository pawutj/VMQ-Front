import React, { useState, useEffect } from "react";
import { _shuffleArray, getRandomNFromArray } from "./util";
import { _mockData, _mockAllTitle, _mockAllTitleWithKey } from "./mock";
import { ENDPOINT } from "./setting";
const getChoice = () => [
  ...getRandomNFromArray(_mockAllTitleWithKey, 5),
  { title: "None", url: "None" },
];
function ChoicePage({ myChoice, setMyChoice }) {
  console.log(_mockAllTitleWithKey);
  const [randomChoice, setRandomChoice] = useState(getChoice());
  const sendSong = (title, url) => {
    fetch(`${ENDPOINT}/addsong/?title=${title}&url=${url}`, {
      method: "GET",
    });
  };
  const random = ({ title, url }) => {
    const temp = _shuffleArray(_mockData.filter((c) => c.title == title))[0];

    if (myChoice < 10) {
      if (title != "None") sendSong(temp.title, temp.url);
      setRandomChoice(getChoice());
      if (title != "None") setMyChoice(myChoice + 1);
    }
  };
  return (
    <div>
      <h1>Choose your favorite VN Ex. AstralAir </h1>
      <h2>{`${myChoice}/10`}</h2>
      {randomChoice.map((c) => (
        <button style={{ margin: 10 }} onClick={() => random(c)}>
          <h4>{c.title}</h4>
        </button>
      ))}
    </div>
  );
}

export default ChoicePage;
