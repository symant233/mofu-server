import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import me from '../middlewares/me';
import user from '../middlewares/user';
import UserController from '../controllers/user';

const router = new Router();

router.get(
  'get my detail',
  '/user/@me/detail',
  jwt, me,
  UserController.detail
);

router.get(
  'get user detail',
  '/user/:user/detail',
  jwt, me, user,
  UserController.userDetail
);

export default router;
