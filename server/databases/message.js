import db from '../utils/mongo';
import MessageModel from '../models/message';
import { MessageType } from '../constants';
import Flake from '../utils/flake';

class MessageStore {
  /**
   * @param groupId
   * @param meId
   * @param content
   */
  createGroupMessage = async (groupId, meId, content) => {
    const id = Flake.generate();
    const now = new Date();
    const info = {
      channel: groupId,
      type: MessageType.GROUP,
      author: meId,
      content,
      timestamp: now,
    };
    const rs = await db.messages.insertOne({ _id: id, ...info });
    if (!rs.result.ok) return undefined;
    return { id, ...info };
  };

  // TODO
  listGroupMessages = async (groupId) => {};
}

export default new MessageStore();
