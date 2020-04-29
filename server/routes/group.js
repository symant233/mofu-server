import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import me from '../middlewares/me';
import group from '../middlewares/group';
import GroupController from '../controllers/group';

const router = new Router();

router.get(
  'group detail',
  '/group/:group/detail',
  jwt, me, group,
  GroupController.detail
);

router.post(
  'create group',
  '/group/',
  jwt, me,
  GroupController.create
);

router.delete(
  'destroy group',
  '/group/:group/destroy',
  jwt, me, group,
  GroupController.destroy
);

router.get(
  'list all my groups',
  '/group/@me',
  jwt, me,
  GroupController.listMyGroups
);

export default router;
