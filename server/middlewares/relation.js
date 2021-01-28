import RelationStore from '../databases/relation';

export default async function user(ctx, next) {
  const relation = await RelationStore.get(ctx.params.relation);
  if (!relation) ctx.throw(404, 'relation not found');
  ctx.relation = relation;
  return next();
}
