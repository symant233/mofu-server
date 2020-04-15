import Router from 'koa-router';
import AuthController from '../controllers/auth';

const router = new Router();
router.prefix('/auth');

router.get('test', '/', (ctx, next) => {
  ctx.body = 'test';
  next();
});

router.get('register', '/register', AuthController.register);

export default router;
