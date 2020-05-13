import Koa from 'koa';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import routing from './routes';
import koaBody from 'koa-body';
import { port, mongoURL } from './config';
import db from './utils/mongo';
import cors from '@koa/cors';
import msg from './utils/socket';

db.connect(mongoURL);
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
app.use(helmet.hidePoweredBy({ setTo: 'mofu-sever' }));
app.use(koaBody()); // 支持json请求数据

routing(app);

app.listen(port, () => {
  console.log(`⭐ mofu running @ http://localhost:${port}`);
});
