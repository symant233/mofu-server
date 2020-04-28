import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import me from '../middlewares/me';
import user from '../middlewares/user'
import UserController from '../controllers/user';

const router = new Router();
router.prefix('/user');

router.get(
  'get my detail',
  '/@me/detail',
  jwt, me,
  UserController.detail
);

router.delete(
  'destroy myself permanently',
  '/@me/destroy',
  jwt, me,
  UserController.destroy
);

router.get(
  'get user detail',
  '/:user/detail',
  jwt, me, user,
  UserController.userDetail
);

export default router;
