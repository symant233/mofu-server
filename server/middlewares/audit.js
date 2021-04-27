export default async function audit(ctx, next) {
  const id = ctx.state.user.id;
  if (id !== '10473831864042' && id !== '10290909060497') {
    // 此处为了节省开发, 只设置了特权账号而不是再弄一个账户系统.
    ctx.throw(401, 'Permission denied');
  }
  return next();
}
