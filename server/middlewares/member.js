import MemberStore from '../databases/member';

export default async function member(ctx, next) {
  const member = await MemberStore.find({
    memberId: ctx.params.member,
  });
  if (!member) ctx.throw(404, 'member not found');
  ctx.member = member;
  return next();
}
