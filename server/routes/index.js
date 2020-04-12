import users from './users';
import auth from './auth';

const routes = [users, auth];

function routing(app) {
  routes.forEach((route) => {
    app.use(route.routes()).use(
      route.allowedMethods({
        throw: true,
      })
    );
  });
}

export default routing;
