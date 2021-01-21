var kindof = require("kindof")
exports = module.exports = egal
exports.deepEgal = deepEgal

function egal(a, b) {
  if (a === b) return true

  var type
  switch (type = kindofPlain(a)) {
    case "date":
      if (type !== kindof(b)) return false
      return a.valueOf() === b.valueOf()

    case "regexp":
      if (type !== kindof(b)) return false
      return a.toString() === b.toString()

    case "object":
      if (type !== kindofPlain(b)) return false

      var constructor = getConstructorOf(a)
      if (constructor !== getConstructorOf(b)) return false
      if (!hasValueOf(a) || !hasValueOf(b)) return false
      return deepEgal(a.valueOf(), b.valueOf())

    default: return false
  }
}

function maybeEgal(a, b) {
  if (egal(a, b)) return true

  var type = kindofPlain(a)
  switch (type) {
    case "array":
    case "plain": return type === kindofPlain(b) ? null : false
    default: return false
  }
}

function deepEgal(a, b, egal) {
  return deepEgalWith(typeof egal === "function" ? egal : maybeEgal, a, b)
}

function deepEgalWith(egal, a, b, aStack, bStack) {
  var equal = egal(a, b)
  if (equal != null) return Boolean(equal)

  var type = kindof(a)
  switch (type) {
    /* eslint no-fallthrough: 0 */
    case "array":
    case "object": if (type === kindof(b)) break
    default: return false
  }

  var aPos = aStack && aStack.indexOf(a)
  var bPos = bStack && bStack.indexOf(b)
  if (aPos !== bPos) return false
  if (aPos != null && aPos >= 0) return true

  aStack = aStack ? aStack.concat([a]) : [a]
  bStack = bStack ? bStack.concat([b]) : [b]

  var i
  switch (type) {
    case "array":
      if (a.length !== b.length) return false
      if (a.length === 0) return true

      for (i = 0; i < a.length; ++i)
        if (!deepEgalWith(egal, a[i], b[i], aStack, bStack)) return false

      return true

    case "object":
      var aKeys = keys(a)
      var bKeys = keys(b)
      if (aKeys.length !== bKeys.length) return false
      if (aKeys.length === 0) return true

      aKeys.sort()
      bKeys.sort()
      for (i = 0; i < aKeys.length; ++i) if (aKeys[i] !== bKeys[i]) return false

      for (var key in a)
        if (!deepEgalWith(egal, a[key], b[key], aStack, bStack)) return false

      return true
  }
}

function kindofPlain(obj) {
  var type = kindof(obj)
  if (type === "object" && isObjectPlain(obj)) return "plain"
  return type
}

function isObjectPlain(obj) {
  var prototype = Object.getPrototypeOf(obj)
  if (prototype === null) return true
  if (!("constructor" in prototype)) return true
  return prototype.constructor === Object
}

function getConstructorOf(obj) {
  var prototype = Object.getPrototypeOf(obj)
  return prototype === null ? undefined : prototype.constructor
}

function hasValueOf(obj) {
  var valueOf = obj.valueOf
  return typeof valueOf === "function" && valueOf !== Object.prototype.valueOf
}

function keys(obj) {
  var all = []
  for (var key in obj) all.push(key)
  return all
}
