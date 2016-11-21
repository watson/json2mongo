# json2mongo

This is a [MongoDB Extended
JSON](http://docs.mongodb.org/manual/reference/mongodb-extended-json/)
convertion utility which converts Strict Mode syntax to JavaScript Mode.

[![Build status](https://travis-ci.org/watson/json2mongo.svg?branch=master)](https://travis-ci.org/watson/json2mongo)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install json2mongo --save
```

## Example usage

```javascript
var json2mongo = require('json2mongo');

var query = {
  created: { $date: '2013-01-01T00:00:00.000Z' },
  foo: { $undefined: true },
  bar: { $regex: '[0-9]' },
  baz: { $regex: '[a-z]', $options: 'i' }
};

json2mongo(query); // {
                   //   created: new Date('2013-01-01T00:00:00.000Z'),
                   //   foo: undefined,
                   //   bar: /[0-9]/,
                   //   baz: /[a-z]/i
                   // }
```

## License

MIT
