'use strict';

module.exports = function (query) {
  var key, val;
  for (key in query) {
    if (!query.hasOwnProperty(key)) next;
    val = query[key];
    switch (key) {
    case '$date':
      return new Date(val);
    case '$regex':
      return new RegExp(val, query['$options']);
    case '$undefined':
      return undefined;
    }
    if (typeof val === 'object' && !Array.isArray(val))
      query[key] = module.exports(val);
  }
  return query;
};
