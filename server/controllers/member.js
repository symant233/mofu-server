import MemberStore from '../databases/member';

class MemberController {
  detail = async (ctx) => {
    ctx.body = ctx.member;
  };

  destroy = async (ctx) => {
    const { me, member, group } = ctx;
    if (me.id !== member.user || me.id !== group.owner) {
      // TODO: MANAGER permit
      ctx.throw(403, 'permission denied');
    }
    const rs = await MemberStore.destroy(member.id);
    if (!rs) ctx.throw(500, 'destroy member failed');
    ctx.status = 204;
  };

  listGroupMembers = async (ctx) => {
    const { group } = ctx;
    const rs = await MemberStore.listInGroup(group.id);
    if (!rs) ctx.throw(500, 'list my groups failed');
    ctx.body = rs;
  };

  // TODO: request member
}

export default new MemberController();
