import { MongoClient } from 'mongodb';

class Mongo {
  connect(url) {
    this.client = new MongoClient(url, { useNewUrlParser: true });
    this.client.connect(async (err, result) => {
      if (!err) {
        console.log(`✅ MongoDB connected.`);
      } else {
        console.log(`❌ MongoDB connect failed: ${err.message}.`);
        return;
      }
      this.mongo = this.client.db();
    });
  }
  close() {
    this.client.close();
  }
}

const db = new Mongo();

export default db;
