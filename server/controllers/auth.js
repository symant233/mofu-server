import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import UserStore from '../databases/user';
import AuditStore from '../databases/audit';

class AuthController {
  _sign = (id) => {
    return jwt.sign({ id }, jwtSecret);
  };

  _verify = (token) => {
    return jwt.verify(token, jwtSecret);
  };

  _setCookie = (ctx, token) => {
    if (process.env.NODE_ENV === 'development') {
      ctx.cookies.set('token', token, { sameSite: 'lax' });
    }
  };

  register = async (ctx) => {
    // 处理传入数据
    const { email, passwd, nick } = ctx.request.body;
    // TODO: validator
    if (!nick) ctx.throw(400, 'empty nick not allowed');
    const exist = await UserStore.findEmail(email);
    if (exist) ctx.throw(500, 'user exists');
    // 写入数据库
    const user = await UserStore.create(email, passwd, nick);
    if (!user) ctx.throw(500, 'internal server error');
    AuditStore.create(ctx.request.ip, 21, 'login', email);
    // 返回 token 设置 cookies
    const token = this._sign(user.id);
    this._setCookie(ctx, token);
    ctx.body = { ...user, token };
  };

  handleLogin = async (ctx) => {
    const { email, passwd } = ctx.request.body;
    let user, token;
    if (email && passwd) {
      const result = await UserStore.verifyPasswd(email, passwd);
      if (!result) {
        AuditStore.create(ctx.request.ip, 22, 'login failed', email);
        ctx.throw(400, 'email not registered or wrong password');
      }
      user = await UserStore.findEmail(email);
      token = this._sign(user.id);
      this._setCookie(ctx, token);
    }
    if (!user) ctx.throw(500, 'login failed');
    AuditStore.create(ctx.request.ip, 21, 'login', email);
    ctx.body = { ...user, token };
  };

  env = async (ctx) => {
    ctx.body = { env: process.env.NODE_ENV, time: new Date().getTime() };
  };

  // ! audit controll start

  audit = async (ctx) => {
    let { page = 1 } = ctx.query;
    const rs = await AuditStore.listPage(page);
    ctx.body = rs;
  };

  auditCount = async (ctx) => {
    const rs = await AuditStore.count();
    ctx.body = { count: rs };
  };

  ipBlock = async (ctx) => {
    const { ip, msg } = ctx.request.body;
    const exist = await AuditStore.findBlockedIp(ip);
    if (exist) ctx.throw(400, 'already blocked');
    const rs = await AuditStore.block(ip, msg);
    if (!rs) ctx.throw(500, 'faild to block ip');
    ctx.status = 204;
  };

  injectionDemo = async (ctx) => {
    const { user } = ctx.request.body;
    const rs = await AuditStore.inject(user);
    ctx.body = rs;
  };
}

export default new AuthController();
