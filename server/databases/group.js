import db from '../utils/mongo';
import GroupModel from '../models/group';
import UserModel from '../models/user';
import Flake from '../utils/flake';

class GroupStore {
  constructor() {
    this.LIMIT = 200;
  }

  find = async (groupId) => {
    const cursor = db.groups.aggregate([
      { $match: { _id: groupId } },
      {
        $lookup: {
          from: 'users',
          let: { owner: '$owner' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$owner'] },
              },
            },
            { $project: UserModel.projection },
          ],
          as: 'owner',
        },
      },
      { $unwind: { path: '$owner', preserveNullAndEmptyArrays: true } },
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
  create = async (name, owner) => {
    const id = Flake.generate();
    const now = new Date();
    const limit = this.LIMIT;
    const rs = await db.groups.insertOne({
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
   * @returns boolean
   * 销毁群组
   * 删除组内 member 需使用 MemberStore.groupDestroy
   */
  destroy = async (groupId) => {
    const rs = await db.groups.deleteOne({ _id: groupId });
    return rs.result.ok;
  };

  // TODO:
  listMyGroups = async (userId) => {};
}

export default new GroupStore();
