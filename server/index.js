const express = require("express");
const app = express();
const http = require("http");
const httpServer  = http.createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
})

io.on("connection", (socket) => {
  const users = [];
  // currently connected socket instances
  const sockets = io.of("/").sockets;
  for(let [id, socket] of sockets){
    users.push({ userId: id, username: socket.username })
  }
  socket.emit('users', users)
  socket.broadcast.emit("user connected",{
    userId: socket.id, username: socket.username
  })
})

httpServer.listen(3000, () => {
  console.log(`HTTP server listening on PORT: 3000`)
})