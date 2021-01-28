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
}

export default new RelationController();
