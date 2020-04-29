import MemberController from './member';
import GroupStore from '../databases/group';
import MemberStore from '../databases/member';
import MemberType from '../constants/member';

class GroupController {
  detail = async (ctx) => {
    ctx.body = ctx.group;
  };

  insert = async (ctx) => {
    const { name } = ctx.request.body;
    const { me } = ctx;
    // TODO: validator
    const group = await GroupStore.insert(name, me.id);
    if (!group) ctx.throw(500, 'create group faild');
    const member = await MemberStore.insert(me.id, group.id, MemberType.OWNER);
    if (!member) {
      GroupStore.destroy(group.id);
      ctx.throw(500, 'create member faild');
    }
    ctx.body = group;
  };
}

export default new GroupController();
