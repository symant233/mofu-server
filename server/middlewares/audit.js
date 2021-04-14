export default async function audit(ctx, next) {
  const id = ctx.state.user.id;
  if (id !== '10473831864042') {
    ctx.throw(401, 'authentication error');
  }
  return next();
}
