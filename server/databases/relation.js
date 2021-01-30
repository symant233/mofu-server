import db from '../utils/mongo';
import UserModel from '../models/user';
import RelationModal from '../models/relation';
import UserStore from '../databases/user';
import Flake from '../utils/flake';

class RelationStore {
  get = async (relationId) => {
    const r = await db.relations.findOne({ _id: relationId });
    return new RelationModal(r).parse();
  };

  findRelation = async (meId, userId) => {
    const users = [meId, userId].sort();
    const find = await db.relations.findOne({ users });
    return new RelationModal(find).parse();
  };

  getDetail = async (relation, me) => {
    let userId;
    relation.users.forEach((i) => {
      if (me.id !== i) userId = i;
    });
    const user = await UserStore.find(userId);
    relation.users = user;
    return relation;
  };

  /**
   * create relation
   * @param me
   * @param user
   * @param type 请求/临时/屏蔽
   */
  creatRelation = async (me, user, type) => {
    const id = Flake.generate();
    const now = new Date();
    const r = await db.relations.insertOne({
      _id: id,
      type,
      users: [me.id, user.id].sort(),
      since: now,
    });
    return r.result.ok === 1;
  };

  // TODO 未对接方法
  /**
   * update relation type
   * @param relationId
   * @param type RelationType
   */
  updateRelation = async (relationId, type) => {
    const r = await db.relations.updateOne(
      { _id: relationId },
      { $set: { type } }
    );
    return r.result.ok === 1;
  };

  // TODO 未对接方法
  deleteRelation = async (relationId) => {
    const r = await db.relations.deleteOne({ _id: relationId });
    return r.result.ok === 1;
  };

  listRelationships = async (meId) => {
    const cursor = await db.relations.aggregate([
      { $match: { users: meId } },
      {
        $lookup: {
          from: 'users',
          let: { userIds: '$users' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$_id', '$$userIds'] },
              },
            },
            { $project: UserModel.projection },
          ],
          as: 'users',
        },
      },
      { $project: RelationModal.projection },
    ]);
    const relations = [];
    while (await cursor.hasNext()) {
      const data = await cursor.next();
      relations.push(data);
    }
    return relations;
  };
}

export default new RelationStore();
