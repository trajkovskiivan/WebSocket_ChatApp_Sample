// Make connection
let socket = io.connect('http://localhost:80');


// Query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');


// Emit Events
btn.addEventListener('click', () => {
  // emit goest down to the socket to the base/
  // emit has 2 parameters, the name of the message and the message
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});


// broadcastiong
message.addEventListener('keypress', () => {
  socket.emit("typing", handle.value)
})


// Listen for events
socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
  message.value = '';
});

// broadcasting
socket.on("typing", (data) => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`
})