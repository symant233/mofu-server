import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import me from '../middlewares/me';
import member from '../middlewares/member'
import group from '../middlewares/group'
import MemberController from '../controllers/member';

const router = new Router();
router.prefix('/member');

router.get(
  'member detail',
  '/:member/detail',
  jwt, me, member,
  MemberController.detail
);

export default router;
