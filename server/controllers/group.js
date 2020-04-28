import GroupStore from '../stores/group';

class GroupController {
  detail = async (ctx) => {
    ctx.body = ctx.group;
  };

  insert = async (ctx) => {
    const { name } = ctx.request.body;
    const { me } = ctx;
    // TODO: validator
    const rs = await GroupStore.insert(name, me.id);
    if (!rs) ctx.throw(500, 'create group faild');
    ctx.body = rs;
  };
}

export default new GroupController();
