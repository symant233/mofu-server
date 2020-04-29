import db from '../utils/mongo';
import MemberModel from '../models/member';
import Flake from '../utils/flake';

class MemberStore {
  /**
   * @param dict { memberId, userId, groupId }
   * @returns member object
   */
  find = async ({ memberId, userId, groupId }) => {
    let condition;
    if (memberId) condition = { _id: memberId };
    else if (userId) condition = { user: userId };
    else if (groupId) condition = { group: groupId };
    else return undefined;
    let member = db.mongo.collection('members').findOne(condition);
    member = new MemberModel.parse(member);
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
   * @returns members dict
   */
  listInGroup = async (groupId) => {
    let members = [];
    const cursor = db.mongo
      .collection('members')
      .aggregate([
        { $match: { group: groupId } },
        { $project: MemberModel.projection },
      ]);
    while (await cursor.hasNext()) {
      members.push(new MemberModel(await cursor.next()));
    }
    return members;
  };
}

export default new MemberStore();
