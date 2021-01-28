import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import me from '../middlewares/me';
import user from '../middlewares/user';
import relation from '../middlewares/relation';
import RelationController from '../controllers/relation';

const router = new Router();

router.get(
  'get relation detail',
  '/relation/:relation/detail',
  jwt, me, relation,
  RelationController.detail
);

router.post(
  'create relation',
  '/relation/create/:user',
  jwt, me, user,
  RelationController.create
);

export default router;
