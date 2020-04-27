export default class Basic {
  // mongodb basic projection
  static projection = {
    _id: 0,
    id: '$_id',
  };
}
