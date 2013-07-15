'use strict';

module.exports = function (query) {
  var key, val;
  for (key in query) {
    if (!query.hasOwnProperty(key)) continue;
    val = query[key];
    switch (key) {
    case '$date':
      return new Date(val);
    case '$regex':
      return new RegExp(val, query.$options);
    case '$undefined':
      return undefined;
    }
    if (typeof val === 'object')
      query[key] = module.exports(val);
  }
  return query;
};
