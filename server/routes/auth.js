import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import audit from '../middlewares/audit';
import AuthController from '../controllers/auth';

const router = new Router();

router.post(
  'register',
  '/auth/register',
  AuthController.register
);

router.post(
  'email login',
  '/auth/login',
  AuthController.handleLogin
);

router.get(
  'environment',
  '/env',
  AuthController.env
);

router.get(
  'client public ip address',
  '/ip',
  AuthController.publicIP
);

router.get(
  'list audit log page',
  '/audit',
  jwt, audit,
  AuthController.audit
);

router.get(
  'get audit log count',
  '/audit/count',
  jwt, audit,
  AuthController.auditCount
);

router.post(
  'block an ip',
  '/audit/block',
  jwt, audit,
  AuthController.ipBlock
);

if(process.env.NODE_ENV === 'development') {
  router.post(
    'mongodb injection demo',
    '/inject',
    AuthController.injectionDemo
  );
}

export default router;
