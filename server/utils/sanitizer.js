import AuditStore from '../databases/audit';

export function mongoSanitize(v, ip) {
  if (v instanceof Object) {
    for (let key in v) {
      if (/^\$/.test(key)) {
        let payload = JSON.stringify(v);
        AuditStore.create(ip, 30, 'mongodb injection', payload);
        delete v[key];
      } else {
        mongoSanitize(v[key]);
      }
    }
  }
  return v;
}
