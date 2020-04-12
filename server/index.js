import Koa from 'koa';
import logger from 'koa-logger';
import error from 'koa-json-error';
import helmet from 'koa-helmet';
import routing from './routes';
import config from './config';

const app = new Koa();

app.use((ctx, next) => {
  // skip logger for root
  if (ctx.request.path === '/') {
    ctx.response.body = 'API @MOFU-SERVER';
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

routing(app);

app.listen(config.port, () => {
  console.log(`🦊 mofu running @ http://localhost:${config.port}`);
});
