import Router from 'koa-router';
import AuthController from '../controllers/auth';

const router = new Router();

router.post(
  'register',
  '/auth/register',
  AuthController.register
);

router.post(
  'email & token login',
  '/auth/login',
  AuthController.handleLogin
);

router.get(
  'environment',
  '/env',
  AuthController.env
);

router.post(
  'list audit log page',
  '/audit',
  AuthController.audit
)

export default router;
