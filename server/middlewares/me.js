import UserStore from '../stores/user';

// 使用该中间件同时使用 jwt 中间件
export default async function me(ctx, next) {
  try {
    const id = ctx.state.user.id;
    const me = await UserStore.find(id);
    ctx.me = me;
    return next();
  } catch (err) {
    ctx.throw(401, 'authentication error');
  }
}

// const { me } = ctx;
