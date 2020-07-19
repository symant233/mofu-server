import db from '../utils/mongo';
import MemberModel from '../models/member';
import { MemberType } from '../constants';
import UserModel from '../models/user';
import Flake from '../utils/flake';

class MemberStore {
  /**
   * @param memberId
   * @returns member object
   */
  find = async (memberId) => {
    const cursor = db.members.aggregate([
      { $match: { _id: memberId } },
      {
        $lookup: {
          from: 'users',
          let: { user: '$user' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$user'] },
              },
            },
            { $project: UserModel.projection },
          ],
          as: 'user',
        },
      },
      { $unwind: { path: '$user' } },
      { $project: MemberModel.projection },
    ]);
    let member;
    if (await cursor.hasNext()) {
      member = new MemberModel(await cursor.next());
    }
    return member;
  };

  /**
   * @param userId
   * @param groupId
   * @returns member object
   */
  findByGroupUser = async (userId, groupId) => {
    const cursor = db.members.aggregate([
      { $match: { user: userId, group: groupId } },
      {
        $lookup: {
          from: 'users',
          let: { user: '$user' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$user'] },
              },
            },
            { $project: UserModel.projection },
          ],
          as: 'user',
        },
      },
      { $unwind: { path: '$user' } },
      { $project: MemberModel.projection },
    ]);
    let member;
    if (await cursor.hasNext()) {
      member = new MemberModel(await cursor.next());
    }
    return member;
  };

  /**
   * @param userId
   * @param groupId
   * @param type MemberType
   */
  create = async (userId, groupId, type) => {
    const id = Flake.generate();
    const now = new Date();
    const rs = await db.members.insertOne({
      _id: id,
      user: userId,
      group: groupId,
      type,
      since: now,
    });
    if (!rs.result.ok) return undefined;
    return new MemberModel({
      id,
      user: userId,
      group: groupId,
      type,
      since: now,
    });
  };

  /**
   * @param groupId
   * @returns members Array
   */
  listInGroup = async (groupId) => {
    const cursor = db.members.aggregate([
      { $match: { group: groupId } },
      {
        $lookup: {
          from: 'users',
          let: { user: '$user' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$user'] },
              },
            },
            { $project: UserModel.projection },
          ],
          as: 'user',
        },
      },
      { $unwind: { path: '$user' } },
      { $project: MemberModel.projection },
    ]);
    const members = [];
    while (await cursor.hasNext()) {
      const data = await cursor.next();
      members.push(new MemberModel(data));
    }
    return members;
  };

  update = async (memberId, type) => {
    let updates = { type };
    if (type === MemberType.NORMAL || type === MemberType.BANNED) {
      updates.since = new Date();
    }
    const rs = await db.members.updateOne(
      {
        _id: memberId,
      },
      { $set: updates }
    );
    return rs.result.ok;
  };
}

export default new MemberStore();
