import Koa from 'koa';
import logger from 'koa-logger';
import error from 'koa-json-error';
import helmet from 'koa-helmet';
import routing from './routes';
const app = new Koa();

app.use((ctx, next) => {
  // skip logger for root
  if (ctx.request.path === '/') {
    ctx.response.body = 'API FOR MOFU-SERVER';
  }
  return next();
});
app.use(logger());
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'mofu-sever' }))
app.use(
  error(err => {
    return {
      status: err.status,
      message: err.message,
      code: err.code
    };
  })
);

routing(app);

app.listen(3000);
