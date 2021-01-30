import MessageStore from '../databases/message';
import { MemberType, MessageType, RelationType } from '../constants';
import msg from '../utils/socket';

class MessageController {
  createGroupMessage = async (ctx) => {
    let { content } = ctx.request.body;
    // TODO: content validator
    if (!content) ctx.throw(400, 'empty message content');
    const { me, group, member } = ctx;
    const t = member.type;
    if (t === MemberType.REQUEST || t === MemberType.BANNED) {
      ctx.throw(403, 'permission denied');
    }
    if (member.stop > new Date()) {
      ctx.throw(500, 'forbidden to talk');
    }
    const rs = await MessageStore.createMessage(
      group.id,
      me.id,
      content,
      MessageType.GROUP
    );
    if (!rs) ctx.throw(500, 'create message failed');
    msg.to(group.id).emit('new msg', rs);
    ctx.body = rs;
  };

  listGroupMessages = async (ctx) => {
    const { me, group } = ctx;
    let { before, after, limit = 50 } = ctx.query;
    let messageId = null;
    let method = 'before';
    if (typeof before !== 'undefined' && before.length > 0) {
      messageId = before;
      method = 'before';
    } else if (typeof after !== 'undefined' && after.length > 0) {
      messageId = after;
      method = 'after';
    }
    limit = Math.max(Math.min(100, limit), 1); // 1~100
    const messages = await MessageStore.listGroupMessages(
      group.id,
      messageId,
      limit,
      method
    );
    if (typeof messages === 'undefined' || messages.length <= 0)
      ctx.throw(400, 'empty');
    ctx.body = messages;
  };

  createDirectMessage = async (ctx) => {
    let { content } = ctx.request.body;
    // TODO: content validator
    if (!content) ctx.throw(400, 'empty message content');
    const { me, relation } = ctx;
    const t = relation.type;
    if (t !== RelationType.FRIEND && t !== RelationType.TEMPORARY) {
      ctx.throw(403, 'permission denied');
    }
    const rs = await MessageStore.createMessage(
      relation.id,
      me.id,
      content,
      MessageType.DIRECT
    );
    if (!rs) ctx.throw(500, 'create message failed');
    msg.to(relation.id).emit('new msg', rs);
    ctx.body = rs;
  };
}

export default new MessageController();
