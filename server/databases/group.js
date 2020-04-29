import db from '../utils/mongo';
import GroupModel from '../models/group';
import MemberStore from './member';
import Flake from '../utils/flake';

class GroupStore {
  constructor() {
    this.LIMIT = 200;
  }

  find = async (groupId) => {
    const cursor = db.mongo
      .collection('groups')
      .aggregate([
        { $match: { _id: groupId } },
        { $project: GroupModel.projection },
      ]);
    let group;
    if (await cursor.hasNext()) {
      group = new GroupModel(await cursor.next());
    }
    return group;
  };

  /**
   * @param name string
   * @param owner flake
   */
  insert = async (name, owner) => {
    const id = Flake.generate();
    const now = new Date();
    const limit = this.LIMIT;
    const rs = await db.mongo.collection('groups').insertOne({
      _id: id,
      name,
      owner,
      population: 1,
      limit,
      since: now,
    });
    if (!rs.result.ok) return undefined;
    return new GroupModel({
      id,
      name,
      owner,
      limit,
      since: now,
    });
  };

  /**
   * @param groupId
   * 销毁群组 同时删除组内 member
   */
  destroy = async (groupId) => {
    let rs;
    rs = await db.mongo.collection('groups').deleteOne({ _id: groupId });
    if (!rs.result.ok) return false;
    rs = await MemberStore.groupDestroy(groupId);
    return rs; // 经调用返回布尔值
  };
}

export default new GroupStore();
