import db from '../utils/mongo';
import UserModel from '../models/user';
import MemberStore from './member';
import Flake from '../utils/flake';
import crypto from 'crypto';

class UserStore {
  /**
   * @param {*} userId Flake
   */
  find = async (userId) => {
    const cursor = db.mongo
      .collection('users')
      .aggregate([
        { $match: { _id: userId } },
        { $project: UserModel.projection },
      ]);
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
    const id = Flake.generate();
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
    if (!rs.result.ok) return undefined;
    return new UserModel({
      id,
      email,
      nick,
      since: now,
    });
  };

  verifyPasswd = async (email, passwd) => {
    const user = await db.mongo.collection('users').findOne({ email });
    const hash = crypto.createHash('sha256');
    hash.update(passwd);
    return user.passwd === hash.digest('hex');
  };

  destroy = async (userId) => {
    let rs;
    rs = await db.mongo.collection('users').deleteOne({ _id: userId });
    if (!rs.result.ok) return false;
    rs = await MemberStore.userDestroy(userId);
    return rs; // 经调用返回布尔值
  };
}

export default new UserStore();
