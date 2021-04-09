### koa error handling
https://github.com/koajs/koa/wiki/Error-Handling

```js
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err, ctx) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  */
});
```
### string
```js
if (typeof myVar === 'string' || myVar instanceof String)
// it's a string
else
// it's something else
```