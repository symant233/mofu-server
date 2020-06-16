### jwt
turn to `server/middlewares/jwt.js`,

鉴权工具, 有详细的注释在其中, 之前还没建这个中间件文档就直接放那了.

### me
依赖于 `jwt` 中间件, 由其解析 & 验证 token 后得到 userId.


### 其他
```
user
member
group
relation
```
这些中间件需要在链接中传递信息, 如需要传递一个 `user` 的 Flake Id, 则需在路由中使用 `/:user` 然后加入该中间件. 举例:
```js
router.get(
  'get user detail', // 描述
  '/:user/detail',   // 路由地址
  jwt, me, user,     // 中间件
  UserController.userDetail // 异步函数
);
```