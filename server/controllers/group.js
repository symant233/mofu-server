import GroupStore from '../databases/group';
import MemberStore from '../databases/member';
import { MemberType } from '../constants';

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

  listMyGroups = async (ctx) => {
    const { me } = ctx;
    const rs = await GroupStore.listMyGroups(me.id);
    ctx.body = rs;
  };
}

export default new GroupController();
