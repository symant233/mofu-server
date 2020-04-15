import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import AuthController from '../controllers/auth';

const router = new Router();
router.prefix('/auth');

router.get('register', '/register', AuthController.register);

router.get('detail', '/detail', jwt, AuthController.detail);

export default router;
