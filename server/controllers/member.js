import MemberStore from '../databases/member';

class MemberController {
  detail = async (ctx) => {
    ctx.body = ctx.member;
  };

  listGroupMembers = async (ctx) => {
    const { group } = ctx;
    const rs = await MemberStore.listInGroup(group.id);
    if (!rs) ctx.throw(500, 'list my groups failed');
    ctx.body = rs;
  };

  request = async (ctx) => {};

  accept = async (ctx) => {};
}

export default new MemberController();
