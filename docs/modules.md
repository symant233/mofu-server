### Koa
https://github.com/koajs/koa/blob/master/docs/api/context.md

### koa-jwt 
见 server/middlewares/jwt.js

https://github.com/koajs/jwt#retrieving-the-token

### koa-router
https://github.com/koajs/router/blob/HEAD/API.md



### jsonwebtoken
https://www.npmjs.com/package/jsonwebtoken

```js
import jwt from 'jsonwebtoken';

const a = jwt.sign({ id: 1234 }, 'mofumofu');
// token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwiaWF0IjoxNTg2NzY4MzY5fQ.-Kf22ffaoFn3u82SK3SqlAWLusN8mpPYGFny8tTWe_s';

jwt.decode(token);
jwt.verify(token, 'mofumofu');
// { id: 1234, iat: 1586768369 }
jwt.verify(token, 'aaaa');
// ERROR{ name: 'JsonWebTokenError', message: 'invalid signature' }

// expire 
jwt.sign({ id: 1234 }, 'mofumofu', { expiresIn: '45 days' })

// use try-catch
try {
  const token = jwt.verify(token, 'mofumofu');
} catch (err) {
  console.log(err.message);
}
```

### mongodb
mongodb atlas cluster:
```js
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://xxxx-admin:<password>@xxxx-cluster0-?????.azure.mongodb.net/<DATABASE>?retryWrites=true&w=majority";
// 本地使用 mongodb://127.0.0.1:27017/mofu 即可
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
```
其中隐去xxxx的是注册时填写的簇名, <DATABASE> 要填写需要连接到的库名, password填密码.

### socket.io
```js
import Socket from 'socket.io';
import { socketPort } from './config';

const io = Socket();

const msg = io.of('/messages');
msg.on('connection', (socket) => {
  let user = 1; // 每一个新连接都会重置
  socket.on('new', (data) => {
    socket.broadcast.emit('cast:' + data); // 所有人除了我收到
    socket.emit('socket:' + data); // 只有我收到
    msg.emit('msg:' + data); // 包括我所有人收到
  });
});

io.listen(socketPort);
```