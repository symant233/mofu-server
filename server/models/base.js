export default class BaseModel {
  // mongodb base projection
  static projection = {
    _id: 0,
    id: '$_id',
  };
}
