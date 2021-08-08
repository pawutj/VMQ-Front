import React, { useState, useEffect } from "react";
import EndCredit from "./EndCredit";
import socketIOClient from "socket.io-client";
import Content from "./Content";
import ChoicePage from "./ChoicePage";
import { ENDPOINT } from "./setting";

const data = { foo: 1, bar: 2 };

function App() {
  const [username, setUsername] = useState("");
  const [response, setResponse] = useState("");
  const [allScore, setAllScore] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [songList, setSongList] = useState([]);
  const [player, setPlayer] = useState("");
  const [index, setIndex] = useState(-1);
  const [url, seturl] = useState("PWbi8J1_X5Q");
  const sendMessage = (username, score) => {
    fetch(`${ENDPOINT}/update/?username=${username}&score=${score}`, {
      method: "GET",
    });
  };

  const sendStart = () => {
    fetch(`${ENDPOINT}/start`, {
      method: "GET",
    });
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      console.log("UPDATE");
      console.log(data);
      setResponse(data);
    });

    socket.on("AllScore", (data) => {
      console.log("allscore");
      console.log(data);
      setAllScore(data);
    });

    socket.on("SongList", (data) => {
      console.log("SongList");
      console.log(data);
      setSongList(data);
    });

    socket.on("Start", (data) => {
      console.log("Start");
      console.log(data);

      setIsStart(true);
    });

    socket.on("IndexInterval", (data) => {
      console.log("IndexInterval");
      console.log(data);

      setIndex(data);
    });

    socket.on("urlInterval", (data) => {
      console.log("urlInterval");
      console.log(data);

      seturl(data);
    });
  }, []);

  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <button onClick={sendMessage}>test Emit</button>
      <button
        onClick={() => {
          sendStart(true);
        }}
      >
        <p>start</p>
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>
      </form>

      {!isStart && <ChoicePage />}
      {isStart && isEnd == false && (
        <Content
          sendMessage={sendMessage}
          allScore={allScore}
          setIsStart={setIsStart}
          setIsEnd={setIsEnd}
          songList={songList}
          player={player}
          setPlayer={setPlayer}
          username={username}
          setUsername={setUsername}
          setIndex={setIndex}
          index={index}
          url={url}
          seturl={seturl}
        />
      )}
      {isEnd && <EndCredit />}
    </div>
  );
}

export default App;
