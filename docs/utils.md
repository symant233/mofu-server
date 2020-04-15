### Flake
随便写了个 仅限用于使用人数不多的情况 有重复则再生成

120+04+16+3260  (11位)

距1900年份+月+日+四位随机数
```js
import Flake from './flake';
const flake = new Flake();
const id = flake.generate();
// 12004163260
```
默认关闭了机器码 可以进`flake.js`中取消注释 (12位)