import snakecase from 'snakecase-keys';

export default class BaseModel {
  constructor(data = {}) {
    this.id = data._id || data.id;
  }

  // mongodb base projection
  static projection = {
    _id: 0,
    id: '$_id',
  };

  /**
   * 去除多余属性, 转化属性名
   * @param {*} data
   */
  static parse(data) {
    if (data._id) data.id = data._id;
    Object.keys(data).forEach((key) => {
      if (this.projection[key] === 0) delete data[key];
    });
    return snakecase(data);
  }

  parse() {
    return this.constructor.parse(this);
  }
}
