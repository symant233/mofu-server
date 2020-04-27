import Random from './random';

/** Refer: docs/utils#flake */
export default class Flake {
  /**
   * @param {*} opts
   * @constructor
   */
  constructor(opts = {}) {
    const { machine, EPOCH } = opts;
    this.machine = machine || 0;
    this.EPOCH = EPOCH || 1577750400000; // 2019-12-31
  }

  /**
   * 生成基于时间和机器的随机标识
   * @returns {String} 字符串
   */
  generate() {
    let result = '';
    const now = new Date();

    result += now.getTime() - this.EPOCH;
    result += Random.getMultiInt(3);
    // result += this.machine;
    return result;
  }
}
