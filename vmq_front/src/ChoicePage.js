import React, { useState, useEffect } from "react";
import { shuffle, getRandomNFromArray } from "./util";
import { _mockData, _mockAllTitle } from "./mock";

const getChoice = () => [
  ...getRandomNFromArray(_mockData, 5),
  { title: "None", url: "None" },
];
function ChoicePage() {
  const [randomChoice, setRandomChoice] = useState(getChoice());
  const random = (c) => {
    setRandomChoice(getChoice());
    console.log(c);
  };
  return (
    <div>
      <h1>test</h1>
      {randomChoice.map((c) => (
        <button style={{ margin: 10 }} onClick={() => random(c)}>
          <h4>{c.title}</h4>
        </button>
      ))}
    </div>
  );
}

export default ChoicePage;
