import MemberStore from '../stores/member';

export default async function member(ctx, next) {
  const member = await MemberStore.find(ctx.params.member);
  if (!member) ctx.throw(404, 'member not found');
  ctx.member = member;
  return next();
}
