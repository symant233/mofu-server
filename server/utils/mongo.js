import { MongoClient } from 'mongodb';

class Mongo {
  connect(url) {
    this.client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.client.connect(async (err, result) => {
      if (!err) {
        console.log(`✅ MongoDB connected.`);
      } else {
        console.log(`❌ MongoDB connect failed: ${err.name}.`);
        return;
      }
      this.mongo = this.client.db();
      // collection alias:
      this.users = this.mongo.collection('users');
      this.groups = this.mongo.collection('groups');
      this.members = this.mongo.collection('members');
      this.messages = this.mongo.collection('messages');
      this.relations = this.mongo.collection('relations');
      await this.createIndexes();
    });
  }

  async createIndexes() {
    let rs;
    rs = await this.users.createIndex({ email: 1 });
  }

  close() {
    this.client.close();
  }
}

const db = new Mongo();

export default db;
