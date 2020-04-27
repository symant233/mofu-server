import db from '../utils/mongo';
import UserModel from '../structures/user';
import Flake from '../utils/flake';
import crypto from 'crypto';

class UserStore {
  /**
   * @param {*} id Flake
   */
  find = async (id) => {
    const cursor = db.mongo
      .collection('users')
      .aggregate([{ $match: { _id: id } }, { $project: UserModel.projection }]);
    let result;
    if (await cursor.hasNext()) {
      const user = await cursor.next();
      result = new UserModel(user);
    }
    return result;
  };

  /**
   * @param {*} email String
   */
  findEmail = async (email) => {
    const cursor = db.mongo
      .collection('users')
      .aggregate([{ $match: { email } }, { $project: UserModel.projection }]);
    let result;
    if (await cursor.hasNext()) {
      const user = await cursor.next();
      result = new UserModel(user);
    }
    return result;
  };

  insert = async (email, passwd, nick) => {
    const flake = new Flake();
    const id = flake.generate();
    // TODO: id 重复检测
    const hash = crypto.createHash('sha256');
    hash.update(passwd);
    const now = new Date();
    const rs = await db.mongo.collection('users').insertOne({
      _id: id,
      email,
      passwd: hash.digest('hex'),
      nick,
      since: now,
    });
    if (rs.result.ok) {
      return new UserModel({
        id,
        email,
        nick,
        since: now,
      });
    }
    return undefined;
  };

  verifyPasswd = async (email, passwd) => {
    const user = await db.mongo.collection('users').findOne({ email });
    const hash = crypto.createHash('sha256');
    hash.update(passwd);
    return user.passwd === hash.digest('hex');
  };
}

export default new UserStore();
