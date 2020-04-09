import Router from 'koa-router';
import body from 'koa-body';
import { apiBase, apiVersion } from '../config';
import jwt from '../middlewares/jwt';
import me from '../middlewares/me';
import AuthControllers from '../controllers/auth';

const router = new Router();
router.prefix(`/${apiBase}/${apiVersion}/auth`);

router.post('register', '/register', body(), AuthControllers.register);

router.post('login', '/login', body(), AuthControllers.authenticate);

router.post('logout', '/logout', jwt, me, body(), AuthControllers.logout);

export default router;
