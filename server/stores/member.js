import db from '../utils/mongo';
import MemberModel from '../models/member';
import GroupStore from './group';
import Flake from '../utils/flake';

class MemberStore {
  detail = async (ctx) => {
    ctx.body = ctx.member;
  };
}

export default new MemberStore();
