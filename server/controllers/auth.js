import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';

class AuthController {
  register = async (ctx) => {
    // 处理传入数据

    // 写入数据库 (分配 uid)

    // 返回 token 设置 cookies
    const token = jwt.sign({ id: 123 }, jwtSecret);
    ctx.cookies.set('token', token);
    ctx.body = { token };
  };

  detail = async (ctx) => {
    // protected resource (jwt)
    ctx.body = ctx.state.user;
  };

  handleLogin = async (ctx) => {
    const token = ctx.cookies.get('token');
    const { email, passwd } = ctx.request.body;
    let user;
    if (token) {
      try {
        user = jwt.verify(token, jwtSecret);
      } catch (err) {
        ctx.thorw(400, 'invalid token.');
      }
    } else if (email) {
      // TODO: handle email login
    }
    ctx.thorw(400, 'login failed.');
  };
}

export default new AuthController();
