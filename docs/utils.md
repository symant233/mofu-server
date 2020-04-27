### flake
随便写了个，*仅限用于请求次数不多的情况*，重复检测目前没做。

`10230447554+175` (位数会递增)

距2019-12-31的毫秒数，三位的随机数。
```js
import Flake from './flake';
const flake = new Flake();
// Flake({ machine: 6, EPOCH: 1577750499999 })
const id = flake.generate();
// 10230447554175
```
默认关闭了机器码，可以进`flake.js`中取消注释。