import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import me from '../middlewares/me';
import user from '../middlewares/user';
import relation from '../middlewares/relation';
import RelationController from '../controllers/relation';
import MessageController from '../controllers/message';

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

router.get(
  'list all my relations',
  '/relation/@my',
  jwt, me,
  RelationController.listAll
);

router.post(
  'create direct message',
  '/relation/:relation/message',
  jwt, me, relation,
  MessageController.createDirectMessage
);

export default router;
