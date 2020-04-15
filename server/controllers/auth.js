import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';

class AuthController {
  register = async (ctx) => {
    // 处理传入数据

    // 分配 uid 写入数据库

    // 返回 token 设置 cookies
    const token = jwt.sign({ id: 123 }, jwtSecret);
    ctx.cookies.set('token', token);
    ctx.body = { token };
  };

  detail = async (ctx) => {
    ctx.body = ctx.state.user;
  };
}

export default new AuthController();
