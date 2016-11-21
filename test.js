'use strict'

var mongo = require('mongodb')
var assert = require('assert')
var json2mongo = require('./')

var query = {
  _id: { $oid: '123456789012345678901234' },
  created: { $date: '2013-01-01T00:00:00.000Z' },
  fkey1: { $ref: 'creators', $id: { $oid: '123456789012345678901234' }, $db: 'users' },
  fkey2: { $ref: 'creators', $id: { $oid: '123456789012345678901234' } },
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
  fkey1: new mongo.DBRef(query.fkey1.$ref, mongo.ObjectID(query.fkey1.$id.$oid), query.fkey1.$db),
  fkey2: new mongo.DBRef(query.fkey2.$ref, mongo.ObjectID(query.fkey2.$id.$oid)),
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
