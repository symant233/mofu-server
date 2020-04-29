import UserStore from '../databases/user';

class UserController {
  detail = async (ctx) => {
    // protected resource (jwt)
    ctx.body = ctx.me;
  };

  // 销毁用户 (消息保留)
  destroy = async (ctx) => {
    const { me } = ctx;
    const result = await UserStore.destroy(me.id);
    // TODO: 清除 member, relation
    if (!result) ctx.throw(500, 'destroy faild');
    ctx.status = 204;
  };

  userDetail = async (ctx) => {
    ctx.body = ctx.user;
  };
}

export default new UserController();
