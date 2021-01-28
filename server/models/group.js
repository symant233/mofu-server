import BaseModel from './base';

export default class GroupModel extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.name = data.name;
    this.notes = data.notes;
    this.owner = data.owner;
    this.population = data.population || 1;
    this.limit = data.limit;
    this.since = data.since;
    this.avatar = data.avatar || null;
  }

  static projection = {
    ...BaseModel.projection,
    name: 1,
    notes: 1,
    owner: 1,
    population: 1,
    limit: 1,
    since: 1,
    avatar: 1,
  };
}
