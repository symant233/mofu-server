### flake
随便写了个，*仅限用于使用人数不多的情况*，有重复则再生成。

`10+726228+615`  (11位)

距2010年份+六位随机数+三位毫秒，年份部分超过自增由二位变三位。
```js
import Flake from './flake';
const flake = new Flake();
// Flake({ machine: 6, EPOCH: 2000 })
const id = flake.generate();
// 10726228615
```
默认关闭了机器码，可以进`flake.js`中取消注释 (12位)。