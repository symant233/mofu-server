export default class Random {
  /**
   * @param {Int} min
   * @param {Int} max
   * @returns {Int} 随机整形
   */
  static getRangeInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * 获取单个随机整型值
   * @returns {Int} 随机整形
   */
  static getSingleInt() {
    return Math.floor(Math.random() * 10);
  }

  /**
   * @param {*} num 多少位
   * @returns {String} 长为 num 位的字符串
   */
  static getMultiInt(num = 1) {
    let result = '';
    for (let i = 0; i < num; i++) {
      result = result + this.getSingleInt();
    }
    return result;
  }
}
