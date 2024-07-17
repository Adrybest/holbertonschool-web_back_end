export default function appendToEachArrayValue(array, appendString) {
  const NewAr = [];

  for (const idx of array) {
    NewAr.push(appendString + idx);
  }

  return NewAr;
}
