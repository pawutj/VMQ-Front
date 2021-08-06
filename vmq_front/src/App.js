import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Content from "./Content";
const ENDPOINT = "http://127.0.0.1:4001";
const data = { foo: 1, bar: 2 };

function App() {
  const [response, setResponse] = useState("");
  const [allScore, setAllScore] = [];
  const sendMessage = (username, score) => {
    fetch(`${ENDPOINT}/update/?username=${username}&score=${score}`, {
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
  }, []);

  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <button onClick={sendMessage}>test Emit</button>

      <Content sendMessage={sendMessage} />
    </div>
  );
}

export default App;
