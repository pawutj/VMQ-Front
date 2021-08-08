import React from "react";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import someobject from "./aaaaaa.json";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import all_vn from "./all_vn.json";
import { maxSong, randomSeed } from "./setting";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import SoundSlider from "./Component/SoundSlider";
import {
  filterByVote,
  createNumeralArray,
  jsonObjectTolist,
  uniqueArray,
} from "./util.js";
import { _mockData, _mockAllTitle } from "./mock";
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
var shuffleSeed = require("shuffle-seed");

const mockData = shuffleSeed.shuffle(_mockData, randomSeed);
const mockAllTitle = uniqueArray(
  shuffleSeed.shuffle(_mockAllTitle, randomSeed)
);
function Content({
  sendMessage,
  allScore,
  setIsEnd,
  setIsStart,
  songList,
  player,
  setPlayer,
  username,
  setUsername,
}) {
  const [myScore, setMyScore] = useState(0);
  const [index, setIndex] = useState(-1);
  const [trueAnswer, setTrueAnswer] = useState("");
  const [myAnswer, setMyAnswer] = useState("");
  const [url, seturl] = useState("PWbi8J1_X5Q");
  const [isHide, setIsHide] = useState(false);
  const [time, setTime] = useState(0);
  const [value, setValue] = React.useState(80);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    player.setVolume(newValue);
  };
  const getURL = (index) => {
    if (index >= songList.length) return "0";
    if (index == -1) return "0";
    return songList[index].url;
  };
  const getTrueAnswer = (index) => {
    if (index >= songList.length) return "0";
    if (index == -1) return "-1";
    return songList[index].title;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);

      setIndex((index) => index + 1);
    }, 30000);
    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  useEffect(() => {
    if (index >= songList.length) {
      console.log("end");
      setIsStart(false);
      setIsEnd(true);
    }
    checkAnswer();
    const url = getURL(index);
    const answer = getTrueAnswer(index);
    seturl(url);
    setTrueAnswer(answer);
    console.log(url, answer);
  }, [index]);

  useEffect(() => {
    sendMessage(username, myScore);
  }, [myScore]);

  const checkAnswer = () => {
    const true_a = trueAnswer;
    const my_a = myAnswer;
    console.log(true_a, "!!!", my_a);
    if (true_a == my_a) {
      console.log("True");
      setMyScore(myScore + 1);
    }
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: 45,
    },
  };
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    setPlayer(event.target);
    //   this.setState({
    //     "player": event.target
    // });
  };

  const onPlay = (event) => {
    // console.log(event.target.getVolume(), "!!!!!!!!!!");
    //event.target.setVolume(value);
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
          <SoundSlider value={value} handleChange={handleChange} />
          <Styleh1>ReactGuessYoutube</Styleh1>
          <h1>myScore {myScore}</h1>

          <StyleYoutubeFrame>
            <StyleTriggerHide isHide={isHide}>
              <YouTube
                videoId={url}
                opts={opts}
                onReady={onReady}
                onPlay={onPlay}
                onError={() => {
                  setIndex(index + 1);
                }}
              />
            </StyleTriggerHide>

            <StyleTriggerHide isHide={!isHide}>
              <Stylemaibok />
            </StyleTriggerHide>
          </StyleYoutubeFrame>
          <StyleButtonFrame>
            <Styleh1>
              {index}/{songList.length}
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

            <StyleButton>Send Answer</StyleButton>

            <StyleButton>toggle hide </StyleButton>
            <StyleButton>random URL </StyleButton>
          </StyleButtonFrame>
          <div
            style={{
              justifyContent: "center",
              alignContent: "center",
              margin: "auto",
            }}
          >
            <table>
              <tr>
                <th>Username</th>
                <th>Score</th>
              </tr>
              {allScore.map((c) => (
                <tr>
                  <td>{c.username}</td>
                  <td>{c.score}</td>
                </tr>
              ))}
            </table>
          </div>
        </StyleBody>
      </StyleBG>
    </StyleAPP>
  );
}

export default Content;
