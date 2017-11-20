'use strict'

var mongo = require('mongodb')
var assert = require('assert')
var json2mongo = require('./')

var query = {
  _id: { $oid: '123456789012345678901234' },
  created: { $date: '2013-01-01T00:00:00.000Z' },
  decimal: { $decimal128: '42.42' },
  ts: { $timestamp: { t: 1412180887, i: 1 } },
  fkey1: { $ref: 'creators', $id: { $oid: '123456789012345678901234' }, $db: 'users' },
  fkey2: { $ref: 'creators', $id: { $oid: '123456789012345678901234' } },
  binary: { $binary: Buffer.from('foo') },
  minKey: { $minKey: 1 },
  maxKey: { $maxKey: 1 },
  numberLong: { $numberLong: '9223372036854775807' },
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
}

var result = {
  _id: mongo.ObjectID(query._id.$oid),
  created: new Date('2013-01-01T00:00:00.000Z'),
  decimal: new mongo.Decimal128(Buffer.from('42.42')),
  ts: mongo.Timestamp(1412180887, 1),
  fkey1: new mongo.DBRef(query.fkey1.$ref, mongo.ObjectID(query.fkey1.$id.$oid), query.fkey1.$db),
  fkey2: new mongo.DBRef(query.fkey2.$ref, mongo.ObjectID(query.fkey2.$id.$oid)),
  binary: mongo.Binary(Buffer.from('foo')),
  minKey: mongo.MinKey(),
  maxKey: mongo.MaxKey(),
  numberLong: mongo.Long.MAX_VALUE,
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
}

assert.deepEqual(json2mongo(query), result)
