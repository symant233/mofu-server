import db from '../utils/mongo';
import MemberModel from '../models/member';
import Flake from '../utils/flake';

class MemberStore {
  /**
   * @param memberId
   * @returns member object
   */
  find = async (memberId) => {
    const cursor = db.mongo
      .collection('members')
      .aggregate([
        { $match: { _id: memberId } },
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
    const rs = await db.mongo.collection('members').insertOne({
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
   * @returns boolean
   * 仅用于群组销毁
   */
  groupDestroy = async (groupId) => {
    const rs = await db.mongo
      .collection('members')
      .deleteMany({ group: groupId });
    return rs.result.ok;
  };

  /**
   * @param userId
   * @returns boolean
   * 仅用于用户销毁
   */
  userDestroy = async (userId) => {
    const rs = await db.mongo
      .collection('members')
      .deleteMany({ user: userId });
    return rs.result.ok;
  };

  /**
   * @param memberId
   * @returns boolean
   * 销毁指定的 member
   */
  destroy = async (memberId) => {
    const rs = await db.mongo.collection('members').deleteOne({
      _id: memberId,
    });
    return rs.result.ok;
  };

  /**
   * @param groupId
   * @returns members Array
   */
  listInGroup = async (groupId) => {
    const cursor = db.mongo
      .collection('members')
      .aggregate([
        { $match: { group: groupId } },
        { $project: MemberModel.projection },
      ]);
    const members = [];
    while (await cursor.hasNext()) {
      const data = await cursor.next();
      members.push(new MemberModel(data));
    }
    return members;
  };
}

export default new MemberStore();
