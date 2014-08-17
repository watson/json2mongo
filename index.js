'use strict';

var mongo = require('mongodb');

module.exports = function (obj) {
  var key, val;
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    val = obj[key];
    switch (key) {
      case '$binary':
      case '$type':
        // TODO: Will this behave if $type isn't set?
        return new mongo.Binary(obj.$binary, obj.$type);
      case '$date':
        return new Date(val);
      case '$timestamp':
        return new mongo.Timestamp(val.t, val.i);
      case '$regex':
      case '$options':
        return new RegExp(obj.$regex, obj.$options);
      case '$oid':
        return new mongo.ObjectID(val);
      case '$ref':
      case '$id':
        // TODO: Does this follow the mongo.DBRef interface?
        return new mongo.DBRef(obj.$ref, obj.$id);
      case '$undefined':
        return undefined;
      case '$minKey':
        return new mongo.MinKey();
      case '$maxKey':
        return new mongo.MaxKey();
      case '$numberLong':
        return new mongo.Long(val);
    }
    if (typeof val === 'object')
      obj[key] = module.exports(val);
  }
  return obj;
};
