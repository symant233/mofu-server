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
  'destroy member by member',
  '/group/:group/member/:member',
  jwt, me, group, member,
  MemberController.destroy
);

router.post(
  'request member',
  '/group/:group/',
  jwt, me, group,
  MemberController.request
);

router.patch(
  'accept member',
  '/group/:group/member/:member',
  jwt, me, group, member,
  MemberController.accept
);

export default router;
