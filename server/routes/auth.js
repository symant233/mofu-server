import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import AuthController from '../controllers/auth';

const router = new Router();
router.prefix('/auth');

router.post('register', '/register', AuthController.register);

router.get('detail', '/detail', jwt, AuthController.detail);

router.post('login', '/login', AuthController.handleLogin);

export default router;
