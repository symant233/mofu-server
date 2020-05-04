import MessageStore from '../databases/message';
import { MemberType, MessageType } from '../constants';

class MessageController {
  createGroupMessage = async (ctx) => {
    const { content } = ctx.request.body;
    // TODO: content validator
    const { me, group, member } = ctx;
    const t = member.type;
    if (t === MemberType.REQUEST || t === MemberType.BANNED) {
      ctx.throw(403, 'permission denied');
    }
    if (member.stop > new Date()) {
      ctx.throw(500, 'forbidden to talk');
    }
    const rs = await MessageStore.createGroupMessage(group.id, me.id, content);
    if (!rs) ctx.throw(500, 'create message failed');
    ctx.body = rs;
  };

  // TODO:
  listGroupMessages = async (ctx) => {};
}

export default new MessageController();
