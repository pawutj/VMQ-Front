import React, { useState, useEffect } from "react";
import EndCredit from "./EndCredit";
import socketIOClient from "socket.io-client";
import Content from "./Content";
//const ENDPOINT = "http://127.0.0.1:4001";
const ENDPOINT = "http://159.138.246.162:4001";

const data = { foo: 1, bar: 2 };

function App() {
  const [response, setResponse] = useState("");
  const [allScore, setAllScore] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
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

    socket.on("Start", (data) => {
      console.log("Start");
      console.log(data);

      setIsStart(true);
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
      {isStart && isEnd == false && (
        <Content
          sendMessage={sendMessage}
          allScore={allScore}
          setIsStart={setIsStart}
          setIsEnd={setIsEnd}
        />
      )}
      {isEnd && <EndCredit />}
    </div>
  );
}

export default App;
