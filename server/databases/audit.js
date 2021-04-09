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

  listLatest = async () => {
    const rs = await db.audits.find().sort({ _id: -1 }).limit(25);
    return rs;
  };
}

export default new AuditStore();
