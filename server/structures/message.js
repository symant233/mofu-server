import Basic from './basic';

export default class Message extends Basic {
  constructor(data = {}) {
    this.id = data.id;
    this.channel = data.channel;
    this.type = data.type;
    this.author = data.author;
    this.content = data.content;
    this.timestamp = data.timestamp;
  }

  static projection = {
    ...Basic.projection,
    channel: 1,
    type: 1,
    author: 1,
    content: 1,
    timestamp: 1,
  };
}
