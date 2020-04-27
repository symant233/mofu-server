import { MongoClient } from 'mongodb';

class Mongo {
  connect(url) {
    this.client = new MongoClient(url, { useNewUrlParser: true });
    this.client.connect(async (err, result) => {
      if (!err) {
        console.log(`✅ MongoDB connected.`);
      } else {
        console.log(`❌ MongoDB connect failed: ${err.name}.`);
        return;
      }
      this.mongo = this.client.db();
      await this.createIndexes();
    });
  }

  async createIndexes() {
    let rs;
    rs = await this.mongo.collection('users').createIndex({ email: 1 });
  }

  close() {
    this.client.close();
  }
}

const db = new Mongo();

export default db;
