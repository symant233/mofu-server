import MemberStore from '../databases/member';
import { MemberType } from '../constants';
import io from '../utils/socket';

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
    const myMember = await MemberStore.findByGroupUser(me.id, group.id);
    if (myMember) ctx.throw(500, 'member already exists');
    // ! 注意下方把 type 从 REQUEST 改成了 NORMAL 直接成为成员不用批准,
    // ! 前端还未找到好的地方放接受请求的窗口 先将就一下
    const rs = await MemberStore.create(me.id, group.id, MemberType.NORMAL);
    if (!rs) ctx.throw(500, 'request member failed');
    // socket broadcast
    io.to(me.id).emit('group join', group);
    ctx.body = rs;
  };

  accept = async (ctx) => {
    const { me, group, member } = ctx;
    if (me.id !== group.owner.id) {
      const myMember = await MemberStore.findByGroupUser(me.id, group.id);
      myMember && ctx.throw(403, 'you are not a member');
      if (myMember.type !== MemberType.MANAGER) {
        ctx.throw(403, 'permission denied');
      }
    }
    const rs = await MemberStore.update(member.id, MemberType.NORMAL);
    if (!rs) ctx.throw(500, 'accept failed');
    ctx.status = 204;
  };
}

export default new MemberController();
