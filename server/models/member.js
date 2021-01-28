import BaseModel from './base';

export default class MemberModel extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.user = data.user;
    this.group = data.group;
    this.type = data.type;
    this.stop = data.stop;
    this.since = data.since;
  }

  static projection = {
    ...BaseModel.projection,
    user: 1,
    group: 1,
    type: 1,
    stop: 1,
    since: 1,
  };
}
