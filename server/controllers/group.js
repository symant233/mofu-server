import GroupStore from '../databases/group';
import MemberStore from '../databases/member';
import MemberType from '../constants/member';

class GroupController {
  detail = async (ctx) => {
    ctx.body = ctx.group;
  };

  create = async (ctx) => {
    const { name } = ctx.request.body;
    const { me } = ctx;
    // TODO: validator
    const group = await GroupStore.create(name, me.id);
    if (!group) ctx.throw(500, 'create group failed');
    const member = await MemberStore.create(me.id, group.id, MemberType.OWNER);
    if (!member) {
      GroupStore.destroy(group.id);
      ctx.throw(500, 'create member failed');
    }
    ctx.body = group;
  };

  destroy = async (ctx) => {
    const { me, group } = ctx;
    if (me.id !== group.owner) ctx.throw(403, 'permission denied');
    let rs = await GroupStore.destroy(group.id);
    if (!rs) ctx.throw(500, 'destroy group failed');
    rs = MemberStore.groupDestroy(group.id);
    if (!rs) ctx.throw(500, 'destroy group member failed');
    ctx.status = 204;
  };
}

export default new GroupController();
