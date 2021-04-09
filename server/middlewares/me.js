import UserStore from '../databases/user';
import AuditStore from '../databases/audit';

// 使用该中间件同时使用 jwt 中间件
export default async function me(ctx, next) {
  try {
    const id = ctx.state.user.id;
    const me = await UserStore.find(id);
    if (!me) ctx.throw(500, 'me not found');
    ctx.me = me;
    return next();
  } catch (err) {
    AuditStore.create(ctx.request.ip, 41, 'invalid jwt', ctx.state.user.id);
    ctx.throw(401, 'authentication error');
  }
}

// const { me } = ctx;
