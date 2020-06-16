import GroupStore from '../databases/group';

export default async function group(ctx, next) {
  const group = await GroupStore.find(ctx.params.group);
  if (!group) ctx.throw(404, 'group not found');
  ctx.group = group;
  return next();
}
