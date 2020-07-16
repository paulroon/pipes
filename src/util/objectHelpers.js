const hasKey = (obj, key) => Object.hasOwnProperty.call(obj, key);
const ensureKey = (obj, key) => {
    if (!hasKey(obj, key)) {
      obj[key] = {};
    }
}

module.exports = {
  hasKey,
  ensureKey,
};