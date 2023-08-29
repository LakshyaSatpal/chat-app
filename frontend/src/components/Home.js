import React, { useState } from "react";
import { socket } from "../socket";
import { Chat } from "./Chat";
export const Home = () => {
  const [roomName, setRoomName] = useState("");
  const [roomJoined, setRoomJoined] = useState(false);

  const handleJoinRoom = () => {
    // some validation logic
    if (roomName.length === 0) {
      return;
    }
    // console.log(roomName);
    socket.emit("joinRoom", roomName);
    setRoomJoined(true);
  };

  const roomNameChangeHandler = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      {!roomJoined && (
        <>
          <input
            onChange={roomNameChangeHandler}
            placeholder="Enter room name"
            className="px-3 py-3 bg-gray-50 w-full border-none focus:border-2 focus:border-solid rounded mb-8 focus:border-x-200"
          />
          <button
            onClick={handleJoinRoom}
            className="bg-blue-500 text-white text-lg px-4 py-3 rounded"
          >
            Start Chatting
          </button>
        </>
      )}
      {roomJoined && <Chat />}
    </div>
  );
};
