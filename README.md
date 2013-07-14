# json2mongo

This is a [MongoDB Extended JSON](http://docs.mongodb.org/manual/reference/mongodb-extended-json/)
convertion utility which converts Strict Mode syntax to JavaScript Mode.

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
                   //   created: new Date('2013-12-01T00:00:00.000Z'),
                   //   foo: undefined,
                   //   bar: /[0-9]/,
                   //   baz: /[a-z]/i
                   // }
```
