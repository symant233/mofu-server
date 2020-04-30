import { apiPrefix, apiVersion } from '../config';
import auth from './auth';
import user from './user';
import group from './group';
import member from './member';

const routers = [
  auth,
  user,
  group,
  member,
];

function routing(app) {
  routers.forEach((router) => {
    // add router prefix for all routers
    router.prefix(`/${apiPrefix}/${apiVersion}`);
    router.allowedMethods({ throw: true });
    app.use(router.routes());
  });
}

export default routing;
