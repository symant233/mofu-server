import BaseModel from './base';

export default class MemberModel extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.id = data.id;
    this.group = data.group;
    this.type = data.type;
    this.stop = data.stop;
    this.since = data.since;
  }

  static projection = {
    ...BaseModel.projection,
    group: 1,
    type: 1,
    stop: 1,
    since: 1,
  };
}