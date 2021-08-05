import React from "react";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import someobject from "./aaaaaa.json";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import all_vn from "./all_vn.json";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  filterByVote,
  createNumeralArray,
  jsonObjectTolist,
  uniqueArray,
} from "./util.js";
import {
  StyleAPP,
  StyleButton,
  Styleh1,
  StyleBG,
  StyleBody,
  StyleYoutubeFrame,
  StyleTriggerHide,
  Stylemaibok,
  StyleButtonFrame,
  Frametop,
  Frameright,
  FrameBottom,
  FrameLeft,
  TopRightTriangle,
  BottomLeftTriangle,
} from "./style_component";
import { getRules } from "axe-core";

const mockData = [
  { title: "Subarashiki Hibi ~Furenzoku Sonzai~", url: "TSk8bN_spvE" },
  { title: "Mirai Nostalgia", url: "V9x0oePee6Q" },
  { title: "Hapymaher -Fragmentation Dream-", url: "iYSHPDE9Sx0" },
  { title: "Hapymaher", url: "hIFbCGRdKPo" },
  { title: "Subarashiki Hibi ~Furenzoku Sonzai~", url: "TSk8bN_spvE" },
];
const mockAllTitle = [
  "Mirai Nostalgia",
  "Hapymaher -Fragmentation Dream-",
  "Hapymaher",
  "Subarashiki Hibi ~Furenzoku Sonzai~",
];
function Content() {
  const [myScore, setMyScore] = useState(0);
  const [index, setIndex] = useState(-1);
  const [trueAnswer, setTrueAnswer] = useState("");
  const [myAnswer, setMyAnswer] = useState("");
  const [url, seturl] = useState("PWbi8J1_X5Q");
  const [isHide, setIsHide] = useState(false);
  const [isPlay, setIsplay] = useState(false);
  const getURL = (index) => {
    if (index == -1) return "0";
    return mockData[index].url;
  };
  const getTrueAnswer = (index) => {
    if (index == -1) return "-1";
    return mockData[index].title;
  };

  useEffect(() => {
    const url = getURL(index);
    const answer = getTrueAnswer(index);
    console.log("!!!!!!", url);
    seturl(url);
    setTrueAnswer(answer);
  }, [index]);

  const checkAnswer = () => {
    //console.log(trueAnswer, "!!!!!", myAnswer);

    if (trueAnswer == myAnswer) {
      console.log("True");
      setMyScore(myScore + 1);
    }
    //setIndex(index + 1);
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <StyleAPP className="App">
      <Frametop></Frametop>
      <Frameright></Frameright>
      <FrameLeft></FrameLeft>
      <FrameBottom></FrameBottom>

      <TopRightTriangle>
        <svg xmlns="http://www.w3.org/2000/svg" width="75" height="160">
          <line
            x1="0"
            y1="0"
            x2="75"
            y2="160"
            stroke="#b6b6b6"
            stroke-width="6"
          ></line>
          <polygon points="0, 0 75, 0 75, 160 0, 0" fill="#b6da3e"></polygon>
        </svg>
      </TopRightTriangle>
      <BottomLeftTriangle>
        <svg xmlns="http://www.w3.org/2000/svg" width="75" height="160">
          <line
            x1="0"
            y1="0"
            x2="75"
            y2="160"
            stroke="#b6b6b6"
            stroke-width="6"
          ></line>
          <polygon points="0, 0 0, 160 75, 160 0, 0" fill="#b6da3e"></polygon>
        </svg>
      </BottomLeftTriangle>

      <StyleBG style={{ height: window.innerHeight }}>
        <StyleBody>
          <Styleh1>ReactGuessYoutube</Styleh1>
          <h1>myScore {myScore}</h1>
          <CountdownCircleTimer
            onComplete={() => {
              checkAnswer();
              setIndex(index + 1);
              return [true, 2000]; // repeat animation in 1.5 seconds
            }}
            isPlaying={isPlay}
            duration={30}
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
          <StyleYoutubeFrame>
            <StyleTriggerHide isHide={isHide}>
              <YouTube videoId={url} opts={opts} onReady={onReady} />
            </StyleTriggerHide>

            <StyleTriggerHide isHide={!isHide}>
              <Stylemaibok />
            </StyleTriggerHide>
          </StyleYoutubeFrame>
          <StyleButtonFrame>
            <Styleh1>
              {index}/{mockData.length}
            </Styleh1>

            <Autocomplete
              id="free-solo-demo"
              options={mockAllTitle}
              onChange={(e, v) => setMyAnswer(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="input"
                  margin="normal"
                  variant="outlined"
                  autoComplete="off"
                />
              )}
            />

            <StyleButton onClick={checkAnswer}>Send Answer</StyleButton>

            <StyleButton onClick={() => setIsHide(() => !isHide)}>
              toggle hide{" "}
            </StyleButton>
            <StyleButton
              onClick={() => {
                setIsplay(true);
              }}
            >
              random URL{" "}
            </StyleButton>
          </StyleButtonFrame>
        </StyleBody>
      </StyleBG>
    </StyleAPP>
  );
}

export default Content;
