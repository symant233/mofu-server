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