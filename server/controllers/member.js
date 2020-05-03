import MemberStore from '../databases/member';
import { MemberType } from '../constants';

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

  request = async (ctx) => {
    const { me, group } = ctx;
    const myMember = await MemberStore.findByGroupUser(me.id, gorup.id);
    if (myMember) ctx.throw(500, 'member already exists');
    const rs = await MemberStore.create(me.id, group.id, MemberType.REQUEST);
    if (!rs) ctx.throw(500, 'request member failed');
    ctx.body = rs;
  };

  update = async (ctx) => {
    const { type } = ctx.request.body;
    const { me, group, member } = ctx;
    // TODO: type validator
    if (type === MemberType.OWNER || type === MemberType.REQUEST) {
      ctx.throw(400, 'invalid update type');
    }
    let rs;
    if (me.id === group.owner.id && me.id !== member.user.id) {
      rs = await MemberStore.update(member.id, type);
    } else {
      const myMember = await MemberStore.findByGroupUser(me.id, gorup.id);
      if (myMember.type !== MemberType.MANAGER || type === MemberType.MANAGER) {
        ctx.throw(403, 'permission denied'); // 非群主或管理
      }
      rs = await MemberStore.update(member.id, type);
    }
    if (!rs) ctx.throw(500, 'update failed');
    ctx.status = 204;
  };
}

export default new MemberController();
