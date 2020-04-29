import snakecase from 'snakecase-keys';

export default class BaseModel {
  // mongodb base projection
  static projection = {
    _id: 0,
    id: '$_id',
  };

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
