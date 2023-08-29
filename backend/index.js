import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const port = process.env.PORT || 3030;

io.on("connection", (socket) => {
  console.log("A new user connected via WebSocket");

  socket.on("joinRoom", (room) => {
    console.log(`someone joined ${room}`);
    socket.join(room);
  });

  socket.on("newMessageOnServer", (room, messageData) => {
    socket.to(room).emit("newMessageOnClient", messageData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected from WebSocket");
  });
});

httpServer.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
// app.listen(3000) won't work here as it will create a new http server
