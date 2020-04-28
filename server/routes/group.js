import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import me from '../middlewares/me';
import group from '../middlewares/group'
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
  GroupController.insert
)

export default router;
