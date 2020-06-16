import db from '../utils/mongo';
import MessageModel from '../models/message';
import UserModel from '../models/user';
import { MessageType } from '../constants';
import Flake from '../utils/flake';
import UserStore from './user';

class MessageStore {
  find = async (messageId) => {
    const cursor = db.messages.aggregate([
      {
        $match: { _id: messageId },
      },
      {
        $lookup: {
          from: 'users',
          let: { author: '$author' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$author'] },
              },
            },
            { $project: UserModel.projection },
          ],
          as: 'author',
        },
      },
      { $unwind: { path: '$author' } },
      { $project: MessageModel.projection },
    ]);
    let message;
    if (await cursor.hasNext()) {
      const data = await cursor.next();
      message = new MessageModel(data);
    }
    return message;
  };

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
    const user = await UserStore.find(meId);
    return { id, ...info, author: user };
  };

  listGroupMessages = async (groupId, messageId, limit, method) => {
    let targetId = messageId;
    if (!targetId) {
      if (method === 'before') targetId = '999999999999999';
      if (method === 'after') targetId = '0';
    }
    let op = '$lt';
    let sort = 1;
    switch (method) {
      case 'before':
        op = '$lt';
        sort = -1;
        break;
      case 'after':
        op = '$gt';
        sort = 1;
        break;
      default:
        break;
    }
    const cursor = db.messages
      .aggregate([
        {
          $match: {
            channel: groupId,
            _id: { [op]: targetId },
          },
        },
        {
          $lookup: {
            from: 'users',
            let: { author: '$author' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$_id', '$$author'] },
                },
              },
              { $project: UserModel.projection },
            ],
            as: 'author',
          },
        },
        { $unwind: { path: '$author' } },
        { $project: MessageModel.projection },
      ])
      .sort({ timestamp: sort, id: sort })
      .limit(limit);
    const messages = [];
    while (await cursor.hasNext()) {
      const data = await cursor.next();
      messages.push(new MessageModel(data));
    }
    return sort === -1 ? messages.reverse() : messages;
  };
}

export default new MessageStore();
