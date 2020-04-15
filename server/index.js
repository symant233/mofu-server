import Koa from 'koa';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import routing from './routes';
import koaBody from 'koa-body';
import { port, mongoURL } from './config';
import db from '../utils/mongo';
import fs from 'fs';

db.connect(mongoURL);
const banner = fs.readFileSync('./others/banner.txt', 'utf-8');
const app = new Koa();

app.use((ctx, next) => {
  // enable CORS http://stackoverflow.com/questions/49633157/ddg#49633526
  ctx.set('Access-Control-Allow-Origin', '*');
  if (ctx.request.path === '/') {
    ctx.response.body = banner;
  }
  return next();
});
app.use(logger());
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'mofu-sever' }));
app.use(koaBody());

routing(app);

app.listen(port, () => {
  console.log(`⭐ mofu running @ http://localhost:${port}`);
});
