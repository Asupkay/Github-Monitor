const express = require('express');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 5000;

require('dotenv').config();
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  socket.on('room', (room) => {
    socket.join(room);
  });
});

if(PORT != 5000) {
  app.use(express.static(__dirname + './../client/build'));
}

configRoutes(app);

http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

