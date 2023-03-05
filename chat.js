var socket = io.connect('http://localhost:3000');

// Handle chat messages
var form = document.getElementById('chat-form');
var input = document.getElementById('chat-input');
var messages = document.getElementById('messages');

form.onsubmit = function(e) {
  e.preventDefault();
  var message = input.value;
  socket.emit('chat message', message);
  input.value = '';
}

socket.on('chat message', function(msg) {
  var li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});
