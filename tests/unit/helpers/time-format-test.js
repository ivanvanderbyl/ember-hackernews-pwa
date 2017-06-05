
import { timeFormat } from 'hackernews/helpers/time-format';
import { module, test } from 'qunit';

module('Unit | Helper | time format');

test('it formats time relative', function(assert) {
  let now = new Date(1496668676972);

  let cases = [
    [1496668676972 - (10 * 1e3), '10s'],
    [1496668676972 - (60 * 1e3), '1m'],
    [1496668676972 - (30 * 60 * 1e3), '30m'],
    [1496668676972 - (60 * 60 * 1e3), '1h'],
    [1496668676972 - (23 * 60 * 60 * 1e3), '23h'],
    [1496668676972 - (7 * 24 * 60 * 60 * 1e3), '29 May']
  ];
  assert.expect(cases.length);

  cases.forEach(([input, expected]) => {
    let date2 = new Date(input);
    let result = timeFormat([date2, now]);
    assert.equal(result, expected, expected);
  });
});

