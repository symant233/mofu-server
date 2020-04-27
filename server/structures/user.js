import Basic from './basic';

export default class User extends Basic {
  constructor(data = {}) {
    super(data);
    this.id = data.id;
    this.email = data.email;
    this.passwd = data.passwd;
    this.nick = data.nick;
    this.status = data.status || null;
    this.notes = data.notes || null;
    this.since = data.since;
    this.avatar = data.avatar || null;
  }

  static projection = {
    ...Basic.projection,
    nick: 1,
    status: 1,
    notes: 1,
    since: 1,
    avatar: 1,
  };
}
