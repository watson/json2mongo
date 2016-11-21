'use strict'

module.exports = function (obj) {
  var key, val
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) continue
    val = obj[key]
    switch (key) {
      case '$date':
        return new Date(val)
      case '$regex':
      case '$options':
        return new RegExp(obj.$regex, obj.$options)
      case '$undefined':
        return undefined
    }
    if (typeof val === 'object') {
      obj[key] = module.exports(val)
    }
  }
  return obj
}
