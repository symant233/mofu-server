import Random from './random';

export default class Flake {
  /**
   * @param {*} opts
   * @constructor
   */
  constructor(opts = {}) {
    const { machine, EPOCH } = opts;
    this.machine = machine || 0;
    this.EPOCH = EPOCH || 1900;
  }

  getTime() {
    var now = new Date(),
      month = '' + (now.getMonth() + 1),
      day = '' + now.getDate(),
      year = now.getFullYear() - this.EPOCH;

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
  }

  /**
   * 生成基于时间和机器的随机标识
   * @returns {String} 字符串
   */
  generate() {
    let result = '';
    const now = new Date();
    result += this.getTime();
    result += Random.getMultiInt(4);
    // result += this.machine;
    return result;
  }
}
