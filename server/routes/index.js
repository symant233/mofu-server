import { apiPrefix, apiVersion } from '../config';
import auth from './auth';
import user from './user';
import group from './group';
import member from './member';
import relation from './relation';

const routers = [
  auth,
  user,
  group,
  member,
  relation,
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
