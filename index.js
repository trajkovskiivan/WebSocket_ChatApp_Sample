const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const server = app.listen(80, function () {
  console.log('listening for requests on port 80,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {

  console.log('made socket connection', socket.id);
  // data is the object we send from the frontend
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  // broadcasting
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  })
});