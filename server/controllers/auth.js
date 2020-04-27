import jwt from 'jsonwebtoken';
import Flake from '../utils/flake';
import { jwtSecret } from '../config';
import UserStore from '../stores/user';

class AuthController {
  _sign = (id) => {
    return jwt.sign({ id }, jwtSecret);
  };

  register = async (ctx) => {
    // 处理传入数据
    const { email, passwd, nick } = ctx.request.body;
    // TODO: validator
    const exist = await UserStore.findEmail(email);
    if (exist) ctx.throw(400, 'user exists');

    // 写入数据库
    const user = await UserStore.insert(email, passwd, nick);
    if (!user) ctx.throw(500, 'internal server error');

    // 返回 token 设置 cookies
    const token = this._sign(user.id);
    ctx.cookies.set('token', token);
    ctx.body = { ...user, token };
  };

  detail = async (ctx) => {
    // protected resource (jwt)
    const id = ctx.state.user.id;
    const user = await UserStore.find(id);
    if (!user) ctx.throw(500, 'user not found');
    ctx.body = user;
  };

  handleLogin = async (ctx) => {
    let token = ctx.cookies.get('token');
    const { email, passwd } = ctx.request.body;
    let user;
    if (token) {
      try {
        const decoded = jwt.verify(token, jwtSecret);
        user = await UserStore.find(decoded.id);
      } catch (err) {
        ctx.thorw(400, 'invalid token');
      }
    } else if (email) {
      const result = await UserStore.verifyPasswd(email, passwd);
      if (!result) ctx.throw(400, 'wrong password');
      user = await UserStore.findEmail(email);
      token = this._sign(user.id);
      ctx.cookies.set('token', token);
    }
    if (!user) ctx.thorw(400, 'login failed');
    ctx.body = { ...user, token };
  };
}

export default new AuthController();
