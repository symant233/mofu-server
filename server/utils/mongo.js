import { MongoClient } from 'mongodb';
import { mongoURL } from '../config';

class Mongo {
  constructor() {
    this.client = new MongoClient(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async init() {
    this.mongo = this.client.db('mofu');
    // collection alias:
    this.users = this.mongo.collection('users');
    this.groups = this.mongo.collection('groups');
    this.members = this.mongo.collection('members');
    this.messages = this.mongo.collection('messages');
    this.relations = this.mongo.collection('relations');
    this.audits = this.mongo.collection('audits');
    await this.createIndexes();
  }

  async createIndexes() {
    let rs;
    rs = await this.users.createIndex({ email: 1 });
    rs = await this.audits.createIndex({ ip: 1 });
  }

  close() {
    this.client.close();
  }
}

const db = new Mongo();

export default db;
