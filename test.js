var assert = require('assert');
var json2mongo = require('./index');

var query = {
  created: { $date: '2013-01-01T00:00:00.000Z' },
  foo: { $undefined: true },
  bar: { $regex: '[0-9]' },
  baz: { $regex: '[a-z]', $options: 'i' },
  bool: true,
  obj: { foo: 123 },
  string: 'foo'
};

var result = {
  created: new Date('2013-01-01T00:00:00.000Z'),
  foo: undefined,
  bar: /[0-9]/,
  baz: /[a-z]/i,
  bool: true,
  obj: { foo: 123 },
  string: 'foo'
};

assert.deepEqual(json2mongo(query), result);
