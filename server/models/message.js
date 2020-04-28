import BaseModel from './base';

export default class MessageModel extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.id = data.id;
    this.channel = data.channel;
    this.type = data.type;
    this.author = data.author;
    this.content = data.content;
    this.timestamp = data.timestamp;
  }

  static projection = {
    ...BaseModel.projection,
    channel: 1,
    type: 1,
    author: 1,
    content: 1,
    timestamp: 1,
  };
}
