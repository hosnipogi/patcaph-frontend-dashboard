/**
 * Check if values exists in array
 * @param {Array.<Any>} array Reference array
 * @param {Array.<String>} values List of values
 */
function checkIfExistsInArray(array, values) {
  try {
    if (!Array.isArray(array) || !Array.isArray(values)) {
      throw TypeError('Not an array');
    }
    const lowerCased = values.map(
      (i) => typeof i === 'string' && i.toLowerCase()
    );
    return array.some((i) => lowerCased.includes(i.toLowerCase()));
  } catch (e) {
    return false;
  }
}

export default checkIfExistsInArray;
