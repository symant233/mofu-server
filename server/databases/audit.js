import db from '../utils/mongo';

class AuditStore {
  create = async (ip, type, description, payload) => {
    const now = new Date();
    const rs = await db.audits.insertOne({
      ip,
      type,
      description,
      payload,
      date: now,
    });
    if (!rs.result.ok) return false;
    return true;
  };

  listPage = async (page = 1) => {
    if (page < 1) page = 1;
    const cur = await db.audits
      .find({}, { _id: 0 }) // hide _id field
      .sort({ _id: -1 }) // sort by _id desc
      .limit(25) // page limit
      .skip((page - 1) * 25); // current page
    const rs = [];
    while (await cur.hasNext()) {
      rs.push(await cur.next());
    }
    return rs;
  };

  count = async () => {
    const rs = await db.audits.count();
    return rs;
  };
}

export default new AuditStore();
