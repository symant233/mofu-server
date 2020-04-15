import jwt from 'jsonwebtoken';

class AuthController {
  register = async (ctx) => {
    console.log(ctx.state);
    ctx.body = 'hello';
  };
}

export default new AuthController();
