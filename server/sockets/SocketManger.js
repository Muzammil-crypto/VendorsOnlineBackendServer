const users = require('./users');
const socketToId = {};
const EVENTS = require('./events');

const SocketManger = (io) => {
  io.on(EVENTS.CONNECTION, (socket) => {
    // user enters the site
    const user = JSON.parse(socket.handshake.query.user);
    users[user._id] = { socketId: socket.id, ...user };
    console.log('user connected ', users[user._id].name);
    socketToId[socket.id] = user._id;

    // user disconnects
    socket.on(EVENTS.DISCONNECT, async () => {
      const userId = socketToId[socket.id];

      delete users[userId];
      delete socketToId[socket.id];
    });
  });
};

const sendMessage = (userId, message) => {
  const socketId = users[userId]?.socketId;
  io.to(socketId).emit(EVENTS.CHAT.MESSAGE, message);
};

module.exports = SocketManger;
module.exports.sendMessage = sendMessage;
