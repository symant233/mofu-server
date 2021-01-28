import BaseModel from './base';

export default class UserModel extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.email = data.email;
    this.passwd = data.passwd;
    this.nick = data.nick;
    this.status = data.status || null;
    this.notes = data.notes || null;
    this.since = data.since;
    this.avatar = data.avatar || null;
  }

  // hide email & passwd
  static projection = {
    ...BaseModel.projection,
    nick: 1,
    status: 1,
    notes: 1,
    since: 1,
    avatar: 1,
  };
}
