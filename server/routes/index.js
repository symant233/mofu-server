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
    router.allowedMethods({ throw: true });
    app.use(router.routes());
  });
}

export default routing;
