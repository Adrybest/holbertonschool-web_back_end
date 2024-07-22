export default function cleanSet(set, startString) {
  if (startString === '' || typeof startString !== 'string') {
    return '';
  }
  const res = [];

  for (const item of set) {
    if (item.startsWith(startString)) {
      res.push(item.slice(startString.length));
    }
  }
  const result = [...new Set(res)];
  return result.join('-');
}
