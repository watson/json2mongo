var assert = require('assert');
var json2mongo = require('./index');
var ObjectID = require('mongodb').ObjectID;

var query = {
  _id: { $oid: '529dcfe56939cd00000cedc9' },
  created: { $date: '2013-01-01T00:00:00.000Z' },
  foo: { $undefined: true },
  bar: { $regex: '[0-9]' },
  baz: { $regex: '[a-z]', $options: 'i' },
  $and: [
    { foo: { $undefined: true } },
    { bar: { $undefined: true } }
  ],
  bool: true,
  obj: { foo: 123 },
  string: 'foo'
};

var result = {
  _id: new ObjectID('529dcfe56939cd00000cedc9'),
  created: new Date('2013-01-01T00:00:00.000Z'),
  foo: undefined,
  bar: /[0-9]/,
  baz: /[a-z]/i,
  $and: [
    { foo: undefined },
    { bar: undefined }
  ],
  bool: true,
  obj: { foo: 123 },
  string: 'foo'
};

assert.deepEqual(json2mongo(query), result);
