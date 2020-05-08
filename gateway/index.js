import Server from 'socket.io';
import { socketPort, jwtSecret } from '../server/config';
import jwt from 'jsonwebtoken';

const io = Server();
const msg = io.of('/messages');

msg.on('connection', (socket) => {
  // 防止空连接
  setTimeout(() => {
    if (!socket.userId) socket.disconnect(true);
  }, 9000);

  socket.on('dev', (userId) => {
    // 把 userId 存在 socket session 中
    socket.userId = userId;
  });

  socket.on('auth token', (token) => {
    try {
      const info = jwt.verify(token, jwtSecret);
      socket.userId = info.id;
    } catch (error) {
      socket.disconnect(true);
    }
  });

  socket.on('new message', (data) => {
    socket.broadcast.emit('new message', {
      userId: socket.userId,
      message: data.message,
    });
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      userId: socket.userId,
    });
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      userId: socket.userId,
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user left', {
      userId: socket.userId,
    });
  });
});

io.listen(socketPort);
console.log(`✨ socket running @ http://localhost:${socketPort}`);
