var assert = chai.assert;

describe('isNumeric', function() {

  it('should return true when the value is 123', function() {
    assert.equal(true, isNumeric(123));
  });

  it('should return false when the value is abc', function() {
    assert.equal(false, isNumeric('abc'));
  });

  it('should return false when the value is undefined', function() {
    assert.equal(false, isNumeric());
  });

});