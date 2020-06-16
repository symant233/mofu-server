export function mongoSanitize(v) {
  if (v instanceof Object) {
    for (let key in v) {
      if (/^\$/.test(key)) {
        console.warn('⚠ vulnerable key removed: ' + key);
        delete v[key];
      } else {
        mongoSanitize(v[key]);
      }
    }
  }
  return v;
}
