// Utility
//
// - Needed because:
// - some objs are iterable via .forEach but not an array for .map/filter etc. (wss.clients cough!)
const filter = (arr, matcher) => {
  const coll = [];
  arr.forEach((item) => {
    if (matcher(item)) {
      coll.push(item);
    }
  });
  return coll;
};

module.exports = {
    filter
}