import Basic from './basic';

export default class Group extends Basic {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.notes = data.notes;
    this.owner = data.owner;
    this.limit = data.limit;
    this.since = data.since;
    this.avatar = data.avatar || null;
  }

  static projection = {
    ...Basic.projection,
    name: 1,
    notes: 1,
    owner: 1,
    limit: 1,
    since: 1,
    avatar: 1,
  };
}
