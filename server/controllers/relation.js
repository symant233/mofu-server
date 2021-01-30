import RelationStore from '../databases/relation';

import { RelationType } from '../constants';

class RelationController {
  detail = async (ctx) => {
    let { relation, me } = ctx;
    relation = await RelationStore.getDetail(relation, me);
    ctx.body = relation;
  };

  create = async (ctx) => {
    const { me, user } = ctx;
    const relation = await RelationStore.findRelation(me.id, user.id);
    if (relation) ctx.throw(500, 'relation already exists');
    const rs = await RelationStore.creatRelation(
      me,
      user,
      RelationType.TEMPORARY
    );
    if (!rs) ctx.throw(500, 'create relation faild');
    ctx.status = 204;
  };

  listAll = async (ctx) => {
    const { me } = ctx;
    let tmp;
    let rs = await RelationStore.listRelationships(me.id);
    rs.forEach((r) => {
      tmp = r.users[0].id === me.id ? r.users[1] : r.users[0];
      r.users = tmp;
    });
    ctx.body = rs;
  };
}

export default new RelationController();
