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

const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    let result = {
      status: err.__proto__.status || err.status,
      // name: err.name,
      message: err.message,
    };
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
    ctx.request.body = mongoSanitize(ctx.request.body);
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
