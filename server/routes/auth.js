import Router from 'koa-router';
import AuthController from '../controllers/auth';

const router = new Router();
router.prefix('/auth');

router.post(
  'register',
  '/register',
  AuthController.register
);

router.post(
  'email & token login',
  '/login',
  AuthController.handleLogin
);

export default router;
