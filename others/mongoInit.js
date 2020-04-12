import { MongoClient } from 'mongodb';
import config from '../server/config';

class Mongo {
  connect(url, callback) {
    this.client = new MongoClient(url, { useNewUrlParser: true });
    this.client.connect(async (err, result) => {
      if (!err) {
        console.log(`✅ MongoDB connected.`);
      } else {
        console.log(`❌ MongoDB connect failed: ${err.message}.`);
        return;
      }
      this.mongo = this.client.db();
      if (callback) {
        await callback();
      }
    });
  }
  close() {
    this.client.close();
  }
}

const db = new Mongo();
db.connect(config.mongoURL, () => {
  // create collections and indexes
  db.mongo.createCollection('users');
});
