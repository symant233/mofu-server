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
    this.EPOCH = EPOCH || 2010;
  }

  /**
   * 生成基于时间和机器的随机标识
   * @returns {String} 字符串
   */
  generate() {
    let result = '';
    const now = new Date();

    result += now.getFullYear() - this.EPOCH;
    result += Random.getMultiInt(6);
    result += now.getMilliseconds();
    // result += this.machine;
    return result;
  }
}
