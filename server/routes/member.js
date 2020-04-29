import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import me from '../middlewares/me';
import user from '../middlewares/user';
import member from '../middlewares/member';
import group from '../middlewares/group';
import MemberController from '../controllers/member';

const router = new Router();

router.get(
  'member detail',
  '/member/:member/detail',
  jwt, me, member,
  MemberController.detail
);

router.get(
  'list all members in group',
  '/group/:group/members',
  jwt, me, group,
  MemberController.listGroupMembers
);

router.delete(
  'destroy member by user',
  '/group/:group/user/:user',
  jwt, me, group, user,
  MemberController.destroy
)

router.delete(
  'destroy member by member',
  '/group/:group/member/:member',
  jwt, me, group, member,
  MemberController.destroy
)

export default router;
