import db from '../utils/mongo';
import UserModel from '../models/user';
import MemberStore from './member';
import Flake from '../utils/flake';
import crypto from 'crypto';
import avatarGen from '../utils/avatar';

class UserStore {
  /**
   * @param {*} userId Flake
   */
  find = async (userId) => {
    const cursor = db.users.aggregate([
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
    const cursor = db.users.aggregate([
      { $match: { email } },
      { $project: UserModel.projection },
    ]);
    let result;
    if (await cursor.hasNext()) {
      const user = await cursor.next();
      result = new UserModel(user);
    }
    return result;
  };

  create = async (email, passwd, nick) => {
    const id = Flake.generate();
    const hash = crypto.createHash('sha256');
    hash.update(passwd);
    const now = new Date();
    const avatar = avatarGen();
    const rs = await db.users.insertOne({
      _id: id,
      email,
      passwd: hash.digest('hex'),
      nick,
      avatar,
      since: now,
    });
    if (!rs.result.ok) return undefined;
    return new UserModel({
      id,
      email,
      nick,
      avatar,
      since: now,
    });
  };

  verifyPasswd = async (email, passwd) => {
    const user = await db.users.findOne({ email });
    if (!user) return false;
    const hash = crypto.createHash('sha256');
    hash.update(passwd);
    return user.passwd === hash.digest('hex');
  };
}

export default new UserStore();
