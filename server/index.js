import Koa from 'koa';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import routing from './routes';
import { port, socketPort } from './config';
import db from './utils/mongo';
import io from './utils/socket';
import { mongoSanitize } from './utils/sanitizer';
import AuditStore from './databases/audit';

const handler = async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      AuditStore.create(ctx.request.ip, 44, 'invalid path', ctx.request.href);
    }
  } catch (err) {
    let result = {
      status: err.__proto__.status || err.status,
      message: err.message,
    };
    AuditStore.create(ctx.request.ip, 50, 'server failure', err.message);
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
  let blacklist = await AuditStore.listBlocked();
  setInterval(() => {
    blacklist = await AuditStore.listBlocked();
  }, 3600000); // 每小时自动刷新屏蔽列表

  // 连接成功, 启动服务
  const app = new Koa();
  app.proxy = true; // nginx 反代添加 X-Forwarded-For
  app.use((ctx, next) => {
    if (ctx.request.path === '/') {
      ctx.throw(403);
    }
    return next();
  });
  app.use(cors({ credentials: true }));
  app.use(helmet({ hidePoweredBy: { setTo: 'mofu-server' } }));
  app.use(koaBody()); // 支持json请求数据
  app.use((ctx, next) => {
    if (blacklist.has(ctx.request.ip)) ctx.throw(403, 'IP blocked');
    ctx.request.body = mongoSanitize(ctx.request.body, ctx.request.ip);
    return next();
  });
  app.use(handler);
  app.use(logger());

  routing(app);
  app.listen(port, () => {
    console.log(`♒ mofu-server running @ port ${port}`);
  });

  // 启动 socket server
  io.listen(socketPort);
  console.log(`✨ socket running @ port ${socketPort}`);
});
