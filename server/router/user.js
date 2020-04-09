import Router from 'koa-router';
import body from 'koa-body';
import { apiBase, apiVersion } from '../config';
import jwt from '../middlewares/jwt';
import me from '../middlewares/me';
import user from '../middlewares/user';
import guild from '../middlewares/guild';
import UsersControllers from '../controllers/users';

const router = new Router();

router.prefix(`/${apiBase}/${apiVersion}/users`);

router.get('get current user', '/@me', jwt, me, UsersControllers.findMe);

export default router;
