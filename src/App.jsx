import React, { useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001");

const App = () => {
  const [userName, setUserName] = useState("");
  const [userRoom, setRoom] = useState("");
  const [showChat, setshowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && userRoom !== "") {
      socket.emit("join_room", userRoom); //passing data to the backend
      setshowChat(true);
    }
  };
  return (
    <div className="app">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join room!!</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} userRoom={userRoom}></Chat>
      )}
    </div>
  );
};

export default App;
