var hasOwn = Function.call.bind(Object.hasOwnProperty)
var isEnumerable = Function.call.bind(Object.propertyIsEnumerable)
var getPropertyDescriptor = require("./lib/es6").getPropertyDescriptor
var lookupGetter = Object.prototype.__lookupGetter__
var lookupSetter = Object.prototype.__lookupSetter__
var isArray = Array.isArray
var SET_PROTO_OF_NULL = "Oolong.setPrototypeOf called on null or undefined"

/**
 * @class Oolong
 */

/**
 * Assigns all enumerable properties on `source` objects to `target`.  
 * Similar to `Object.assign`, but takes inherited properties into account.
 * Does not modify anything in the source objects.  
 * Returns `target`.
 *
 * Think of it as _extending_ the first object step by step with others.
 *
 * @example
 * Oolong.assign({name: "John"}, {age: 32}, {shirt: "blue"})
 * // => {name: "John", age: 32, shirt: "blue"}
 *
 * @static
 * @method assign
 * @param target
 * @param source...
 */
exports.assign = function assign(target) {
  if (target != null) for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i]
    for (var key in source) target[key] = source[key]
  }

  return target
}

/**
 * Assigns all own enumerable properties on `source` objects to `target`.  
 * Like `Object.assign`. Does not modify anything in the source objects.  
 * Returns `target`.
 *
 * Think of it as _extending_ the first object step by step with others.
 *
 * @example
 * Oolong.assignOwn({name: "John"}, {age: 32}, Object.create({shirt: "blue"}))
 * // => {name: "John", age: 32}
 *
 * @static
 * @method assignOwn
 * @param target
 * @param source...
 */
exports.assignOwn = function assignOwn(target) {
  if (target != null) for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i]
    for (var key in source) if (hasOwn(source, key)) target[key] = source[key]
  }

  return target
}

/**
 * Creates a shallow clone of the given object, taking all enumerable
 * properties into account.  
 * Shallow means if you've got nested objects, those will be shared.
 *
 * @example
 * Oolong.clone({name: "John", age: 32})
 * // => {name: "John", age: 32}
 *
 * @static
 * @method clone
 * @param object
 */
exports.clone = function clone(obj) {
  return obj == null ? obj : exports.assign({}, obj)
}

/**
 * Creates a deep clone of the given object, taking all enumerable properties
 * into account.
 *
 * @example
 * Oolong.cloneDeep({name: "John", attributes: {age: 42}})
 * // => {name: "John", attributes: {age: 42}}
 *
 * @static
 * @method cloneDeep
 * @param object
 */
exports.cloneDeep = function cloneDeep(obj) {
  return obj == null ? obj : exports.merge({}, obj)
}

/**
 * Creates and returns an object inheriting from `prototype` and, optionally,
 * assigns enumerable properties from `source` objects to the new object.  
 * Uses `Object.create` and [`Oolong.assign`](#Oolong.assign)
 * internally.  
 * Does not modify the given `prototype` nor source objects.
 *
 * @example
 * var PERSON = {name: "Unknown", age: 0}
 * Oolong.create(PERSON, {name: "John"}, {shirt: "blue"})
 * // => {name: "John", age: 0, shirt: "blue"}
 *
 * @static
 * @method create
 * @param prototype
 * @param [source...]
 */
exports.create = function create(obj) {
  obj = arguments[0] = Object.create(obj)
  return arguments.length == 1 ? obj : exports.assign.apply(this, arguments)
}

/**
 * Assigns all enumerable properties on `source` objects to `target` that the
 * `target` already _doesn't_ have. Uses `key in obj` to check for existence.  
 * Does not modify anything in the source objects.  
 * Returns `target`.
 *
 * Note that because **inherited properties** on `target` are checked, any
 * property that exists on `Object.prototype` (e.g. `toString`, `valueOf`)
 * will be skipped. Usually that's not a problem, but if you want to use
 * `Oolong.defaults` for hashmaps/dictionaries with unknown keys, ensure
 * `target` inherits from `null` instead (use `Object.create(null)`).
 *
 * @example
 * var PERSON = {name: "Unknown", age: 0, shirt: "blue"}
 * Oolong.defaults({name: "John", age: 42}, PERSON)
 * // => {name: "John", age: 42, shirt: "blue"}
 *
 * @static
 * @method defaults
 * @param target
 * @param source...
 */
exports.defaults = function defaults(target) {
  if (target != null) for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i]
    for (var key in source) if (!(key in target)) target[key] = source[key]
  }

  return target
}

/**
 * Defines a getter on an object.  
 * Similar to [`Object.prototype.__defineGetter__`][__defineGetter__], but
 * works in a standards compliant way.  
 * Returns `object`.
 *
 * The property is by default made *configurable* and *enumerable*. Should the
 * property exist before, it's enumerability will be left as is.
 *
 * [__defineGetter__]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__
 *
 * @example
 * var person = {birthyear: 1987}
 *
 * Oolong.defineGetter(person, "age", function() {
 *   return new Date().getFullYear() - this.birthyear
 * })
 *
 * person.age // => 28 as of today in 2015.
 *
 * @static
 * @method defineGetter
 * @param object
 * @param property
 * @param fn
 */
exports.defineGetter = function defineGetter(obj, name, fn) {
  return Object.defineProperty(obj, name, {
    get: fn,
    configurable: true,
    enumerable: !hasOwn(obj, name) || isEnumerable(obj, name)
  })
}

/**
 * Defines a setter on an object.  
 * Similar to [`Object.prototype.__defineSetter__`][__defineSetter__], but
 * works in a standards compliant way.  
 * Returns `object`.
 *
 * The property is by default made *configurable* and *enumerable*. Should the
 * property exist before, it's enumerability will be left as is.
 *
 * [__defineSetter__]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineSetter__
 *
 * @example
 * var person = {}
 *
 * Oolong.defineSetter(person, "age", function(age) {
 *   this.birthyear = new Date().getFullYear() - age
 * })
 *
 * person.age = 28
 * person.birthyear // => 1987 as of today in 2015.
 *
 * @static
 * @method defineSetter
 * @param object
 * @param property
 * @param fn
 */
exports.defineSetter = function defineSetter(obj, name, fn) {
  return Object.defineProperty(obj, name, {
    set: fn,
    configurable: true,
    enumerable: !hasOwn(obj, name) || isEnumerable(obj, name)
  })
}

/**
 * Calls the given function for all enumerable properties.  
 * Returns the given object.
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {name: "John", age: 42}
 * Oolong.each(obj, function(val, key) { console.log(key + "=" + val) })
 *
 * @static
 * @method each
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.each = function each(obj, fn, context) {
  for (var key in obj) fn.call(context, obj[key], key, obj)
  return obj
}

/**
 * Calls the given function for all _own_ enumerable properties.  
 * Returns the given object.
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {name: "John", age: 42}
 * Oolong.eachOwn(obj, function(val, key) { console.log(key + "=" + val) })
 *
 * @static
 * @method eachOwn
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.eachOwn = function eachOwn(obj, fn, context) {
  for (var key in obj)
    if (hasOwn(obj, key)) fn.call(context, obj[key], key, obj)

  return obj
}

/**
 * Filters all enumerable properties and returns a new object with only those
 * properties for which the given function returned truthy for.
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {a: 1, b: 2, c: 3, d: 4}
 * Oolong.filter(obj, function(value, key) { return value % 2 == 0 })
 * // => {b: 2, d: 4}
 *
 * @static
 * @method filter
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.filter = function filter(obj, fn, context) {
  var filtered = {}

  for (var key in obj) {
    var value = obj[key]
    if (fn.call(context, value, key, obj)) filtered[key] = value
  }

  return filtered
}

/**
 * @static
 * @method forEach
 * @alias each
 */
exports.forEach = exports.each

/**
 * @static
 * @method forEachOwn
 * @alias eachOwn
 */
exports.forEachOwn = exports.eachOwn

/**
 * Checks whether the given object has the given property, inherited or not.  
 * Given a set, but `undefined` property will still return `true`.
 *
 * @example
 * Oolong.has({name: "John"}) // => true
 * Oolong.has(Object.create({name: "John"}), "name") // => true
 * Oolong.has({}, "name") // => false
 *
 * @static
 * @method has
 * @param object
 * @param key
 */
exports.has = function has(obj, key) {
  return key in obj
}

/**
 * Checks whether the given object has the given property as an own property.  
 * Given a set, but `undefined` property will still return `true`.
 *
 * @example
 * Oolong.hasOwn({name: "John"}) // => true
 * Oolong.hasOwn(Object.create({name: "John"}), "name") // => false
 * Oolong.hasOwn({}, "name") // => false
 *
 * @static
 * @method hasOwn
 * @param object
 * @param key
 */
exports.hasOwn = hasOwn

/**
 * Checks whether the given object has any enumerable properties, inherited
 * or not.
 *
 * @example
 * Oolong.isEmpty({name: "John"}) // => false
 * Oolong.isEmpty(Object.create({name: "John"})) // => false
 * Oolong.isEmpty({}) // => true
 *
 * @static
 * @method isEmpty
 * @param object
 */
exports.isEmpty = function isEmpty(obj) {
  for (obj in obj) return false
  return true
}

/**
 * @static
 * @method isIn
 * @alias has
 */
exports.isIn = exports.has

/**
 * @static
 * @method isInOwn
 * @alias hasOwn
 */
exports.isInOwn = exports.hasOwn

/**
 * Checks whether the given object is of type object and is not null.
 *
 * @example
 * Oolong.isObject({name: "John"}) // => true
 * Oolong.isObject(new Date) // => true
 * Oolong.isObject(42) // => false
 * Oolong.isObject(null) // => false
 *
 * @static
 * @method isObject
 * @param object
 */
exports.isObject = function isObject(obj) {
  return obj != null && typeof obj == "object"
}

/**
 * Checks whether the given object has any _own_ enumerable properties.
 *
 * @example
 * Oolong.isOwnEmpty({name: "John"}) // => false
 * Oolong.isOwnEmpty(Object.create({name: "John"})) // => true
 * Oolong.isOwnEmpty({}) // => true
 *
 * @static
 * @method isOwnEmpty
 * @param object
 */
exports.isOwnEmpty = function isOwnEmpty(obj) {
  for (var key in obj) if (hasOwn(obj, key)) return false
  return true
}

/**
 * Checks whether the given object is one constructed by `Object` or inheriting
 * from `null`.
 *
 * A non-plain object has a `constructor` property set to anything but `Object`.
 * That's the case when you do, for example, `new MyModel`, `new Date`.
 *
 * `Array.prototype` is not considered a plain object just like an array isn't
 * a plain object. JavaScript is a prototypical language and the prototype of
 * an array should be considered an array.
 *
 * @example
 * Oolong.isPlainObject({name: "John", age: 42}) // => true
 * Oolong.isPlainObject(Object.create(null)) // => true
 * Oolong.isPlainObject(Math) // => true
 * Oolong.isPlainObject([]) // => false
 * Oolong.isPlainObject(Array.prototype) // => false
 * Oolong.isPlainObject(new Date) // => false
 * Oolong.isPlainObject("John") // => false
 *
 * @static
 * @method isPlainObject
 * @param object
 */
exports.isPlainObject = function isPlainObject(obj) {
  if (obj == null) return false
  if (typeof obj != "object") return false
  if (isArray(obj)) return false

  var prototype = Object.getPrototypeOf(obj)
  if (prototype === null) return true
  if (!("constructor" in prototype)) return true
  return prototype.constructor === Object
}

/**
 * Returns all enumerable keys of an object as an array.
 * Similar to `Object.keys`, but takes inherited properties into account.
 *
 * @example
 * Oolong.keys({name: "John", age: 32}) // => ["name", "age"]
 *
 * @static
 * @method keys
 * @param object
 */
exports.keys = function keys(obj) {
  var keys = []
  for (var key in obj) keys.push(key)
  return keys
}

/**
 * Looks up and returns a getter on an object.  
 * Similar to [`Object.prototype.__lookupGetter__`][__lookupGetter__], but
 * works in a standards compliant way.  
 * Takes inherited getters into account, just like `__lookupGetter__`.  
 *
 * [__lookupGetter__]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__lookupGetter__
 *
 * @example
 * var person = {birthyear: 1987}
 *
 * Oolong.defineGetter(person, "age", function() {
 *   return new Date().getFullYear() - this.birthyear
 * })
 *
 * Oolong.lookupGetter(person, "age") // Returns the function above.
 *
 * @static
 * @method lookupGetter
 * @param object
 * @param property
 */
exports.lookupGetter = lookupGetter ? Function.call.bind(lookupGetter) :
  function lookupSetter(obj, name) {
  var desc = getPropertyDescriptor(obj, name)
  return desc && desc.get
}

/**
 * Looks up and returns a setter on an object.  
 * Similar to [`Object.prototype.__lookupSetter__`][__lookupSetter__], but
 * works in a standards compliant way.  
 * Takes inherited setters into account, just like `__lookupSetter__`.  
 *
 * [__lookupSetter__]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__lookupSetter__
 *
 * @example
 * var person = {birthyear: 1987}
 *
 * Oolong.defineSetter(person, "age", function(age) {
 *   this.birthyear = new Date().getFullYear() - age
 * })
 *
 * Oolong.lookupSetter(person, "age") // Returns the function above.
 *
 * @static
 * @method lookupSetter
 * @param object
 * @param property
 */
exports.lookupSetter = lookupSetter ? Function.call.bind(lookupSetter) :
  function lookupSetter(obj, name) {
  var desc = getPropertyDescriptor(obj, name)
  return desc && desc.set
}

/**
 * Maps all enumerable property values and returns a new object.
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {a: 1, b: 2, c: 3}
 * Oolong.map(obj, function(value, key) { return value * 2 })
 * // => {a: 2, b: 4, c: 6}
 *
 * @static
 * @method map
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.map = function map(obj, fn, context) {
  var mapped = {}
  for (var key in obj) mapped[key] = fn.call(context, obj[key], key, obj)
  return mapped
}

/**
 * Transforms all enumerable keys and returns a new object.
 *
 * The function will be called with arguments `key`, `value` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var person = {name: "John", age: 32}
 * Oolong.mapKeys(person, function(key) { return key.toUpperCase() })
 * // => {NAME: "John", AGE: 32}
 *
 * @static
 * @method mapKeys
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.mapKeys = function mapKeys(obj, fn, context) {
	var result = {}

	for (var key in obj) {
    var value = obj[key]
    result[fn.call(context, key, value, obj)] = value
  }

	return result
}

/**
 * Assigns all enumerable properties on `source` objects to `target`
 * recursively.  
 * Only plain objects a merged. Refer to
 * [`Oolong.isPlainObject`](#Oolong.isPlainObject) for the definition of
 * a plain object. Does not modify anything in the source objects.
 *
 * Think of it as _extending_ the first object step by step with others.
 *
 * @example
 * var person = {name: "John", attributes: {age: 42}}
 * Oolong.merge(person, {attributes: {height: 190}})
 * person // => {name: "John", attributes: {age: 42, height: 190}}
 *
 * @static
 * @method merge
 * @param target
 * @param source...
 */
exports.merge = function merge(target) {
  if (target != null) for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i]

    for (var key in source) {
      var a = target[key]
      var b = source[key]
      var aIsObject = exports.isPlainObject(a)
      var bIsObject = exports.isPlainObject(b)

      if (aIsObject && bIsObject) merge(a, b)
      else if (bIsObject) target[key] = merge({}, b)
      else target[key] = b
    }
  }

  return target
}

/**
 * Returns a new object with keys taken from the array `keys` and values
 * from the result of calling the given function with `key`, `index` and
 * `keys`.  
 * It's like the reverse of indexing an array.
 *
 * @example
 * var names = ["Alice", "Bob", "Charlie"]
 * var lengths = Oolong.object(names, function(name) { return name.length })
 * lengths // => {Alice: 5, Bob: 3, Charlie: 7}
 *
 * @static
 * @method object
 * @param keys
 * @param callback
 * @param [thisArg]
 */
exports.object = function object(keys, fn, thisArg) {
  var obj = {}

  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i]
    obj[key] = fn.call(thisArg, key, i, keys)
  }

  return obj
}

/**
 * Returns all enumerable _own_ keys of an object as an array.  
 * Same as `Object.keys`, really.
 *
 * @example
 * var person = Object.create({name: "John"})
 * person.age = 42
 * Oolong.ownKeys(person) // => ["age"]
 *
 * @static
 * @method ownKeys
 * @param object
 */
exports.ownKeys = Object.keys

/**
 * Filters the keys of an object to only those given as `keys...`.  
 * Only keys that exist in `object` are included.
 *
 * @example
 * var person = {name: "Alice", email: "alice@example.com", age: 42}
 * Oolong.pick(person, "name", "age") // => {name: "Alice", age: 42}
 *
 * @static
 * @method pick
 * @param object
 * @param keys...
 *
 */
exports.pick = function pick(obj) {
  var target = {}

  for (var i = 1; i < arguments.length; ++i) {
    var key = arguments[i]
    if (key in obj) target[key] = obj[key]
  }

  return target
}

/**
 * Filters the keys of an object to only those given as `keys...` with support
 * for nested keys in an array (`["a", "b", "c"]`).  
 * Only keys that exist in `object` are included.
 *
 * If you'd like to use some other path syntax, feel free to preprocess your
 * keys before passing them to `pickDeep`. For example, for a period-separated
 * syntax (`a.b.c`), use a helper:
 *
 * ```javascript
 * function path(s) { return s.split(".") }
 * Oolong.pickDeep(person, "name", path("address.country"))
 * ```
 *
 * @example
 * var person = {name: "Alice", address: {country: "UK", street: "Downing"}}
 * var obj = Oolong.pickDeep(person, "name", ["address", "country"])
 * obj // => {name: "Alice", address: {country: "UK"}}
 *
 * @static
 * @method pickDeep
 * @param object
 * @param keys...
 *
 */
exports.pickDeep = function pickDeep(obj) {
  var target = {}

  for (var i = 1; i < arguments.length; ++i) {
    var keys = arrayify(arguments[i]), length = keys.length
    var key, value = obj, t = target, j

    for (j = 0; j < length && (key = keys[j]) in value; ++j) value = value[key]
    if (j !== length) continue
    for (j = 0; j < length - 1; ++j) t = t[keys[j]] || (t[keys[j]] = {})
    t[keys[j]] = value
  }

  return target
}

/**
 * Returns a new object with the same keys, but with values being the value's
 * property `key`.  
 * In other words, it's the same as `Oolong.map(obj, Oolong.property(key))`.
 *
 * @example
 * var people = {
 *   a: {name: "Alice"},
 *   b: {name: "Bob"},
 *   c: {name: "Charlie"}
 * }
 *
 * Oolong.pluck(people, "name") // => {a: "Alice", b: "Bob", c: "Charlie"}
 *
 * @static
 * @method pluck
 * @param object
 * @param key
 */
exports.pluck = function pluck(obj, key) {
  return exports.map(obj, exports.property(key))
}

/**
 * Returns a function that returns the given property of an object.
 *
 * @example
 * var getName = Oolong.property("name")
 * getName({name: "John"}) // => "John
 *
 * @static
 * @method property
 * @param key
 */
exports.property = function property(key) {
  return function(obj) { return obj[key] }
}

/**
 * Rejects all enumerable properties and returns a new object without those
 * properties for which the given function returned truthy for.  
 * Opposite of [`filter`](#Oolong.filter).
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {a: 1, b: 2, c: 3, d: 4}
 * Oolong.reject(obj, function(value, key) { return value % 2 == 0 })
 * // => {a: 1, c: 3}
 *
 * @static
 * @method reject
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.reject = function reject(obj, fn, context) {
  return exports.filter(obj, not(fn), context)
}

/**
 * Set the prototype of the given object to the given prototype.  
 * Pass `null` or another object for the prototype.  
 * Returns `object`.
 *
 * Uses `Object.setPrototypeOf` if it exists. Otherwise uses a polyfill.
 *
 * @example
 * var person = {name: "Unnamed", age: 42}
 * var mike = Oolong.setPrototypeOf({name: "Mike"}, person)
 * mike.name // => "Mike
 * mike.age  // => 42
 *
 * @static
 * @method setPrototypeOf
 * @param object
 * @param prototype
 */
exports.setPrototypeOf = Object.setPrototypeOf ||
  function setPrototypeOf(obj, prototype) {
  /* eslint no-proto: 0 */
  if (obj == null) throw new TypeError(SET_PROTO_OF_NULL)
  if (typeof obj == "object") obj.__proto__ = prototype
  return obj
}

/**
 * Returns all enumerable property values as an array.
 *
 * @example
 * Oolong.values({name: "John", age: 32}) // => ["John", 32]
 *
 * @static
 * @method values
 * @param object
 */
exports.values = function values(obj) {
  var values = []
  for (var key in obj) values.push(obj[key])
  return values
}

/**
 * Wraps a given value in an object under the specified key.  
 * Works also with [ECMAScript 6 Symbol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol).
 *
 * @example
 * Oolong.wrap("John", "name") // => {name: "John"}
 *
 * @static
 * @method wrap
 * @param value
 * @param key
 */
exports.wrap = function wrap(value, key) {
  var obj = {}
  obj[key] = value
  return obj
}

function not(fn) { return function() { return !fn.apply(this, arguments) }}
function arrayify(value) { return isArray(value) ? value : [value] }
