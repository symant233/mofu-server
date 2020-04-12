import Koa from 'koa';
import logger from 'koa-logger';
import error from 'koa-json-error';
import helmet from 'koa-helmet';
// import routing from './routes';
import config from './config';
import db from '../utils/mongo';
import fs from 'fs';

db.connect(config.mongoURL);
const banner = fs.readFileSync('./others/banner.txt', 'utf-8');
const app = new Koa();

app.use((ctx, next) => {
  // enable CORS http://stackoverflow.com/questions/49633157/ddg#49633526
  ctx.set('Access-Control-Allow-Origin', '*');
  // escape root
  if (ctx.request.path === '/') {
    ctx.response.body = banner;
  }
  return next();
});
app.use(logger());
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'mofu-sever' }));
app.use(
  error((err) => {
    return {
      code: err.code,
      status: err.status,
      message: err.message,
    };
  })
);

// routing(app);

app.listen(config.port, () => {
  console.log(`⭐ mofu running @ http://localhost:${config.port}`);
});
