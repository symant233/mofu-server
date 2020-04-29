import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import UserStore from '../databases/user';
import camelcase from 'camelcase-keys';

class AuthController {
  _sign = (id) => {
    return jwt.sign({ id }, jwtSecret);
  };

  _verify = (token) => {
    return jwt.verify(token, jwtSecret);
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

  handleLogin = async (ctx) => {
    let token = ctx.cookies.get('token');
    const { email, passwd } = ctx.request.body;
    let user;
    if (token) {
      try {
        const decoded = this._verify(token);
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
    if (!user) ctx.thorw(500, 'login failed');
    ctx.body = { ...user, token };
  };
}

export default new AuthController();
