import Basic from './basic';

export default class Relation extends Basic {
  constructor(data = {}) {
    super(data);
    this.id = data.id;
    this.users = data.users;
    this.type = data.type;
    this.since = data.since;
  }

  static projection = {
    ...Basic.projection,
    users: 1,
    type: 1,
    since: 1,
  };
}
