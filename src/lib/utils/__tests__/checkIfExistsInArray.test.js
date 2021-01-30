import checkIfExistsInArray from '../checkIfExistsInArray';

describe('Checks if some of the values exists in a given array', () => {
  it('will return truthy', () => {
    const result = checkIfExistsInArray(
      ['red', 'blue', 'black'],
      ['RED', 'pink']
    );
    expect(result).toBeTruthy();
  });

  it('should return falsy when string is the input for "values" parameter', () => {
    const result = checkIfExistsInArray(['red', 'blue', 'black'], 'pink');
    expect(result).toBeFalsy();
  });
});
