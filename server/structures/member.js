import Basic from './basic';

export default class Member extends Basic {
  constructor(data = {}) {
    this.id = data.id;
    this.group = data.group;
    this.type = data.type;
    this.stop = data.stop;
    this.since = data.since;
  }

  static projection = {
    ...Basic.projection,
    group: 1,
    type: 1,
    stop: 1,
    since: 1,
  };
}
