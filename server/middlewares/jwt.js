import { jwtSecret } from '../config';
import jwt from 'koa-jwt';

export default jwt({
  secret: jwtSecret, // 密钥用于验证 jwt token
  tokenKey: 'token', // 存为 ctx.state.token
  cookie: 'token', // 检查 cookies 中是否有 token 字段
});

/**
 * 在 router 加上该 jwt 中间件即可
 * 如果验证通过 ctx.state.user 为解码后内容
 * ctx.state.token 为解码前内容
 * 使用 ctx.cookies.set('token', 'ey...') 设置cookies
 * 先检查 cookie 是否存在, 否则查看请求头
 * 跨域请求时在请求头加 Authentication: Bearer ey...
 */
