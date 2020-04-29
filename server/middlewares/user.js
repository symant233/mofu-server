import UserStore from '../databases/user';

export default async function user(ctx, next) {
  const user = await UserStore.find(ctx.params.user);
  if (!user) ctx.throw(404, 'user not found');
  ctx.user = user;
  return next();
}
