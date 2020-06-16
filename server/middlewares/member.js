import MemberStore from '../databases/member';

export default async function member(ctx, next) {
  let member;
  if (ctx.params.member) {
    // 链接中提供了:member
    member = await MemberStore.find(ctx.params.member);
  } else {
    const { me, group } = ctx;
    if (!group) ctx.throw(500, 'member needs group');
    member = await MemberStore.findByGroupUser(me.id, group.id);
  }
  if (!member) ctx.throw(404, 'member not found');
  ctx.member = member;
  return next();
}
