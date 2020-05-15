import Server from 'socket.io';
import { socketPort, jwtSecret } from '../config';
import MemberModel from '../models/member';
import jwt from 'jsonwebtoken';
import db from './mongo';

const io = Server();
const msg = io.of('/msg');

async function _join(socket) {
  console.log(`Login: ${socket.userId}`);
  const cursor = db.members.aggregate([
    { $match: { user: socket.userId } },
    { $project: MemberModel.projection },
  ]);
  while (await cursor.hasNext()) {
    const data = await cursor.next();
    socket.join(data.group);
    console.log(`Join: ${socket.userId}->${data.group}`);
  }
}

msg.on('connection', (socket) => {
  // 防止空连接
  setTimeout(() => {
    if (!socket.userId) socket.disconnect(true);
  }, 5000);

  if (process.env.NODE_ENV === 'development') {
    socket.on('dev', (userId) => {
      // 把 userId 存在 socket session 中
      socket.userId = userId.toString();
      _join(socket);
    });
  }

  socket.on('auth', (token) => {
    if (!token) return;
    try {
      const info = jwt.verify(token, jwtSecret);
      socket.emit('auth', 'succeed!');
      socket.userId = info.id;
    } catch (error) {
      socket.disconnect(true);
    }
    _join(socket);
  });

  socket.on('typing', (channel) => {
    socket.broadcast.to(channel).emit('typing', {
      id: socket.userId,
    });
  });

  socket.on('stop typing', (channel) => {
    socket.broadcast.to(channel).emit('stop typing', {
      id: socket.userId,
    });
  });

  socket.on('disconnect', (channel) => {
    socket.broadcast.to(channel).emit('user left', {
      id: socket.userId,
    });
  });
});

io.listen(socketPort);
console.log(`✨ socket running @ http://localhost:${socketPort}`);
export default msg;
