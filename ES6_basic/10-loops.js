export default function appendToEachArrayValue(array, appendString) {
    const NewAr = [];
    for (const idx of array) {
      NewAr.push(idx + appendString);
    }
    return NewAr;
}