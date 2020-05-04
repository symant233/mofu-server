import UserStore from '../databases/user';

class UserController {
  detail = async (ctx) => {
    // protected resource (jwt)
    ctx.body = ctx.me;
  };

  userDetail = async (ctx) => {
    ctx.body = ctx.user;
  };

  // TODO: update nickname
}

export default new UserController();
