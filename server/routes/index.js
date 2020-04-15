import { apiPrefix, apiVersion } from '../config';
import auth from './auth';

const routers = [auth];

function routing(app) {
  routers.forEach((router) => {
    // add router prefix for all routers
    router.prefix(`/${apiPrefix}/${apiVersion}`);
    router.allowedMethods({ throw: true });
    app.use(router.routes());
  });
}

export default routing;
