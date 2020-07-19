import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import me from '../middlewares/me';
import group from '../middlewares/group';
import member from '../middlewares/member';
import GroupController from '../controllers/group';
import MessageController from '../controllers/message';

const router = new Router();

router.get(
  'group detail',
  '/group/:group/detail',
  jwt, me, group,
  GroupController.detail
);

router.post(
  'create group',
  '/group/',
  jwt, me,
  GroupController.create
);

router.get(
  'list all my groups',
  '/group/@me',
  jwt, me,
  GroupController.listMyGroups
);

router.post(
  'create group message',
  '/group/:group/message',
  jwt, me, group, member,
  MessageController.createGroupMessage
);

router.get(
  'list group messages',
  '/group/:group/messages',
  jwt, me, group,
  MessageController.listGroupMessages
);

export default router;
