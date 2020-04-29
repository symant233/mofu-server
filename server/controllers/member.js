import MemberStore from '../databases/member';

class MemberController {
  detail = async (ctx) => {
    ctx.body = ctx.member;
  };
}

export default new MemberController();
