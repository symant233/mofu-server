import Koa from 'koa';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import routing from './routes';
import koaBody from 'koa-body';
import { port, socketPort } from './config';
import db from './utils/mongo';
import cors from '@koa/cors';
import io from './utils/socket';
import { mongoSanitize } from './utils/sanitizer';
import AuditStore from './databases/audit';

const handler = async (ctx, next) => {
  const ip = ctx.request.ip;
  try {
    await next();
    if (ctx.status === 404) {
      AuditStore.create(ip, 44, 'invalid path', ctx.request.href);
    }
  } catch (err) {
    let result = {
      status: err.__proto__.status || err.status,
      // name: err.name,
      message: err.message,
    };
    AuditStore.create(ip, 50, 'server failure', err.message);
    ctx.status = result.status || 502;
    ctx.body = result;
    console.log(result);
  }
};

db.client.connect(async (err, result) => {
  if (err) {
    console.log(`❌ MongoDB connect failed: ${err}.`);
    return;
  }
  console.log(`✅ MongoDB connected.`);
  await db.init();

  // 连接成功, 启动服务
  const app = new Koa();
  app.proxy = true; // nginx 反代添加 X-Forwarded-For
  app.use(cors({ credentials: true }));
  app.use((ctx, next) => {
    if (ctx.request.path === '/') {
      ctx.throw(403);
    }
    return next();
  });
  app.use(logger());
  app.use(helmet()); // 安全机制
  app.use(helmet.hidePoweredBy({ setTo: 'mofu-server' }));
  app.use(koaBody()); // 支持json请求数据
  app.use((ctx, next) => {
    ctx.request.body = mongoSanitize(ctx.request.body, ctx.request.ip);
    return next();
  });
  app.use(handler);

  routing(app);
  app.listen(port, () => {
    console.log(`♒ mofu-server running @ port ${port}`);
  });

  // 启动 socket server
  io.listen(socketPort);
  console.log(`✨ socket running @ port ${socketPort}`);
});
