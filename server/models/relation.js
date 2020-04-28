import BaseModel from './base';

export default class RelationModel extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.id = data.id;
    this.users = data.users;
    this.type = data.type;
    this.since = data.since;
  }

  static projection = {
    ...BaseModel.projection,
    users: 1,
    type: 1,
    since: 1,
  };
}
