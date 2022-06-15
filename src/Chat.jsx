import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
const Chat = ({ socket, userName, userRoom }) => {
  // this wasnt used as socket .io was giving error here and not workng with the emit fnction
  // function Chat({ socket, userName, userRoom }) {
  const [currMessage, setcurrMessage] = useState("");
  const [messageList, setmessageList] = useState([]);
  const sendMessage = () => {
    if (currMessage !== "") {
      const messageData = {
        room: userRoom,
        author: userName,
        message: currMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("send_message", messageData); //we are sending the message to the socket to the backend
      const newList = [...messageList, messageData];
      setmessageList(newList);
      setcurrMessage(""); //value clears up
    }
  };

  socket.on("receive_message", (data) => {
    console.log(messageList, data);
    const newList = [...messageList, data];
    setmessageList(newList); // change of state to get the message list and also to thread the prev msgs
    console.log(data);
  });

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={userName === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currMessage}
          placeholder="Enter your message"
          onChange={(event) => {
            setcurrMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage(); //enter sends
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
