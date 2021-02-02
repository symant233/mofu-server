import Server from 'socket.io';
import { socketPort, jwtSecret } from '../config';
import MemberModel from '../models/member';
import UserModel from '../models/user';
import jwt from 'jsonwebtoken';
import db from './mongo';
import RelationModel from '../models/relation';

const io = Server();
const msg = io.of('/msg');

function logger(message) {
  console.log('  --- SOCKET', message);
}

async function _join(socket) {
  // 加入群聊
  let cursor = db.members.aggregate([
    { $match: { user: socket.userId } },
    { $project: MemberModel.projection },
  ]);
  while (await cursor.hasNext()) {
    let data = await cursor.next();
    socket.join(data.group);
    logger(`Join Group: ${socket.userId} -> ${data.group}`);
  }
  // 加入私聊
  cursor = db.relations.aggregate([
    { $match: { users: socket.userId } },
    { $project: RelationModel.projection },
  ]);
  while (await cursor.hasNext()) {
    let data = await cursor.next();
    socket.join(data.id);
    logger(`Join DM: ${socket.userId} -> ${data.id}`);
  }
}

async function _me(socket) {
  logger(`Login: ${socket.userId}`);
  let user = await db.users.findOne({ _id: socket.userId });
  user = new UserModel(user).parse();
  socket.me = user;
  socket.join(socket.userId);
}

msg.on('connection', (socket) => {
  // 防止空连接
  setTimeout(() => {
    if (!socket.userId) socket.disconnect(true);
  }, 95000);

  if (process.env.NODE_ENV === 'development') {
    // 开发环境绕过 auth
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
    _me(socket);
    _join(socket);
  });

  socket.on('typing', (channel) => {
    socket.broadcast.to(channel).emit('typing', {
      nick: socket.me.nick,
      channel,
    });
  });

  socket.on('stop typing', (channel) => {
    socket.broadcast.to(channel).emit('stop typing', {
      nick: socket.me.nick,
      channel,
    });
  });

  socket.on('disconnect', (channel) => {
    socket.broadcast.to(channel).emit('user left', {
      id: socket.userId,
    });
  });

  socket.on('join a group', (groupId) => {
    // ! 需要验证是否为群组成员
    socket.join(groupId);
    logger(`Join Group: ${socket.userId} -> ${groupId}`);
  });
});

io.listen(socketPort);
console.log(`✨ socket running @ http://localhost:${socketPort}`);
export default msg;
