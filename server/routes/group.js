import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import me from '../middlewares/me';
import group from '../middlewares/group'
import MemberController from '../controllers/member'
import GroupController from '../controllers/group';

const router = new Router();
router.prefix('/group');

router.get(
  'group detail',
  '/:group/detail',
  jwt, me, group,
  GroupController.detail
);

router.post(
  'create group',
  '/',
  jwt, me,
  GroupController.create
);

router.delete(
  'destroy group',
  '/:group/destroy',
  jwt, me, group,
  GroupController.destroy
);

router.get(
  'list all my groups',
  '/@me',
  jwt, me,
  GroupController.listMyGroups
);

router.get(
  'list all members in group',
  '/:group/members',
  jwt, me, group,
  MemberController.listGroupMembers
);

export default router;
