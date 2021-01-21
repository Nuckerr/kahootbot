Oolong.js API Documentation
===========================
### [Oolong](#Oolong)
- [.assign](#Oolong.assign)(target, source...)
- [.assignOwn](#Oolong.assignOwn)(target, source...)
- [.clone](#Oolong.clone)(object)
- [.cloneDeep](#Oolong.cloneDeep)(object)
- [.create](#Oolong.create)(prototype, [source...])
- [.defaults](#Oolong.defaults)(target, source...)
- [.defineGetter](#Oolong.defineGetter)(object, property, fn)
- [.defineSetter](#Oolong.defineSetter)(object, property, fn)
- [.each](#Oolong.each)(object, callback, [thisArg])
- [.eachOwn](#Oolong.eachOwn)(object, callback, [thisArg])
- [.filter](#Oolong.filter)(object, callback, [thisArg])
- [.forEach](#Oolong.forEach)(object, callback, [thisArg])
- [.forEachOwn](#Oolong.forEachOwn)(object, callback, [thisArg])
- [.has](#Oolong.has)(object, key)
- [.hasOwn](#Oolong.hasOwn)(object, key)
- [.isEmpty](#Oolong.isEmpty)(object)
- [.isIn](#Oolong.isIn)(object, key)
- [.isInOwn](#Oolong.isInOwn)(object, key)
- [.isObject](#Oolong.isObject)(object)
- [.isOwnEmpty](#Oolong.isOwnEmpty)(object)
- [.isPlainObject](#Oolong.isPlainObject)(object)
- [.keys](#Oolong.keys)(object)
- [.lookupGetter](#Oolong.lookupGetter)(object, property)
- [.lookupSetter](#Oolong.lookupSetter)(object, property)
- [.map](#Oolong.map)(object, callback, [thisArg])
- [.mapKeys](#Oolong.mapKeys)(object, callback, [thisArg])
- [.merge](#Oolong.merge)(target, source...)
- [.object](#Oolong.object)(keys, callback, [thisArg])
- [.ownKeys](#Oolong.ownKeys)(object)
- [.pick](#Oolong.pick)(object, keys...)
- [.pickDeep](#Oolong.pickDeep)(object, keys...)
- [.pluck](#Oolong.pluck)(object, key)
- [.property](#Oolong.property)(key)
- [.reject](#Oolong.reject)(object, callback, [thisArg])
- [.setPrototypeOf](#Oolong.setPrototypeOf)(object, prototype)
- [.values](#Oolong.values)(object)
- [.wrap](#Oolong.wrap)(value, key)


<a name="Oolong" />
Oolong
------


<a name="Oolong.assign" />
### Oolong.assign(target, source...)
Assigns all enumerable properties on `source` objects to `target`.  
Similar to `Object.assign`, but takes inherited properties into account.
Does not modify anything in the source objects.  
Returns `target`.

Think of it as _extending_ the first object step by step with others.

**Examples**:
```javascript
Oolong.assign({name: "John"}, {age: 32}, {shirt: "blue"})
// => {name: "John", age: 32, shirt: "blue"}
```

<a name="Oolong.assignOwn" />
### Oolong.assignOwn(target, source...)
Assigns all own enumerable properties on `source` objects to `target`.  
Like `Object.assign`. Does not modify anything in the source objects.  
Returns `target`.

Think of it as _extending_ the first object step by step with others.

**Examples**:
```javascript
Oolong.assignOwn({name: "John"}, {age: 32}, Object.create({shirt: "blue"}))
// => {name: "John", age: 32}
```

<a name="Oolong.clone" />
### Oolong.clone(object)
Creates a shallow clone of the given object, taking all enumerable
properties into account.  
Shallow means if you've got nested objects, those will be shared.

**Examples**:
```javascript
Oolong.clone({name: "John", age: 32})
// => {name: "John", age: 32}
```

<a name="Oolong.cloneDeep" />
### Oolong.cloneDeep(object)
Creates a deep clone of the given object, taking all enumerable properties
into account.

**Examples**:
```javascript
Oolong.cloneDeep({name: "John", attributes: {age: 42}})
// => {name: "John", attributes: {age: 42}}
```

<a name="Oolong.create" />
### Oolong.create(prototype, [source...])
Creates and returns an object inheriting from `prototype` and, optionally,
assigns enumerable properties from `source` objects to the new object.  
Uses `Object.create` and [`Oolong.assign`](#Oolong.assign)
internally.  
Does not modify the given `prototype` nor source objects.

**Examples**:
```javascript
var PERSON = {name: "Unknown", age: 0}
Oolong.create(PERSON, {name: "John"}, {shirt: "blue"})
// => {name: "John", age: 0, shirt: "blue"}
```

<a name="Oolong.defaults" />
### Oolong.defaults(target, source...)
Assigns all enumerable properties on `source` objects to `target` that the
`target` already _doesn't_ have. Uses `key in obj` to check for existence.  
Does not modify anything in the source objects.  
Returns `target`.

Note that because **inherited properties** on `target` are checked, any
property that exists on `Object.prototype` (e.g. `toString`, `valueOf`)
will be skipped. Usually that's not a problem, but if you want to use
`Oolong.defaults` for hashmaps/dictionaries with unknown keys, ensure
`target` inherits from `null` instead (use `Object.create(null)`).

**Examples**:
```javascript
var PERSON = {name: "Unknown", age: 0, shirt: "blue"}
Oolong.defaults({name: "John", age: 42}, PERSON)
// => {name: "John", age: 42, shirt: "blue"}
```

<a name="Oolong.defineGetter" />
### Oolong.defineGetter(object, property, fn)
Defines a getter on an object.  
Similar to [`Object.prototype.__defineGetter__`][__defineGetter__], but
works in a standards compliant way.  
Returns `object`.

The property is by default made *configurable* and *enumerable*. Should the
property exist before, it's enumerability will be left as is.

[__defineGetter__]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__

**Examples**:
```javascript
var person = {birthyear: 1987}

Oolong.defineGetter(person, "age", function() {
  return new Date().getFullYear() - this.birthyear
})

person.age // => 28 as of today in 2015.
```

<a name="Oolong.defineSetter" />
### Oolong.defineSetter(object, property, fn)
Defines a setter on an object.  
Similar to [`Object.prototype.__defineSetter__`][__defineSetter__], but
works in a standards compliant way.  
Returns `object`.

The property is by default made *configurable* and *enumerable*. Should the
property exist before, it's enumerability will be left as is.

[__defineSetter__]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineSetter__

**Examples**:
```javascript
var person = {}

Oolong.defineSetter(person, "age", function(age) {
  this.birthyear = new Date().getFullYear() - age
})

person.age = 28
person.birthyear // => 1987 as of today in 2015.
```

<a name="Oolong.each" />
### Oolong.each(object, callback, [thisArg])
Calls the given function for all enumerable properties.  
Returns the given object.

The function will be called with arguments `value`, `key` and `object` and
bound to `thisArg`.

**Examples**:
```javascript
var obj = {name: "John", age: 42}
Oolong.each(obj, function(val, key) { console.log(key + "=" + val) })
```

<a name="Oolong.eachOwn" />
### Oolong.eachOwn(object, callback, [thisArg])
Calls the given function for all _own_ enumerable properties.  
Returns the given object.

The function will be called with arguments `value`, `key` and `object` and
bound to `thisArg`.

**Examples**:
```javascript
var obj = {name: "John", age: 42}
Oolong.eachOwn(obj, function(val, key) { console.log(key + "=" + val) })
```

<a name="Oolong.filter" />
### Oolong.filter(object, callback, [thisArg])
Filters all enumerable properties and returns a new object with only those
properties for which the given function returned truthy for.

The function will be called with arguments `value`, `key` and `object` and
bound to `thisArg`.

**Examples**:
```javascript
var obj = {a: 1, b: 2, c: 3, d: 4}
Oolong.filter(obj, function(value, key) { return value % 2 == 0 })
// => {b: 2, d: 4}
```

<a name="Oolong.forEach" />
### Oolong.forEach(object, callback, [thisArg])
Alias of [`each`](#Oolong.each).  

<a name="Oolong.forEachOwn" />
### Oolong.forEachOwn(object, callback, [thisArg])
Alias of [`eachOwn`](#Oolong.eachOwn).  

<a name="Oolong.has" />
### Oolong.has(object, key)
Checks whether the given object has the given property, inherited or not.  
Given a set, but `undefined` property will still return `true`.

**Examples**:
```javascript
Oolong.has({name: "John"}) // => true
Oolong.has(Object.create({name: "John"}), "name") // => true
Oolong.has({}, "name") // => false
```

<a name="Oolong.hasOwn" />
### Oolong.hasOwn(object, key)
Checks whether the given object has the given property as an own property.  
Given a set, but `undefined` property will still return `true`.

**Examples**:
```javascript
Oolong.hasOwn({name: "John"}) // => true
Oolong.hasOwn(Object.create({name: "John"}), "name") // => false
Oolong.hasOwn({}, "name") // => false
```

<a name="Oolong.isEmpty" />
### Oolong.isEmpty(object)
Checks whether the given object has any enumerable properties, inherited
or not.

**Examples**:
```javascript
Oolong.isEmpty({name: "John"}) // => false
Oolong.isEmpty(Object.create({name: "John"})) // => false
Oolong.isEmpty({}) // => true
```

<a name="Oolong.isIn" />
### Oolong.isIn(object, key)
Alias of [`has`](#Oolong.has).  

<a name="Oolong.isInOwn" />
### Oolong.isInOwn(object, key)
Alias of [`hasOwn`](#Oolong.hasOwn).  

<a name="Oolong.isObject" />
### Oolong.isObject(object)
Checks whether the given object is of type object and is not null.

**Examples**:
```javascript
Oolong.isObject({name: "John"}) // => true
Oolong.isObject(new Date) // => true
Oolong.isObject(42) // => false
Oolong.isObject(null) // => false
```

<a name="Oolong.isOwnEmpty" />
### Oolong.isOwnEmpty(object)
Checks whether the given object has any _own_ enumerable properties.

**Examples**:
```javascript
Oolong.isOwnEmpty({name: "John"}) // => false
Oolong.isOwnEmpty(Object.create({name: "John"})) // => true
Oolong.isOwnEmpty({}) // => true
```

<a name="Oolong.isPlainObject" />
### Oolong.isPlainObject(object)
Checks whether the given object is one constructed by `Object` or inheriting
from `null`.

A non-plain object has a `constructor` property set to anything but `Object`.
That's the case when you do, for example, `new MyModel`, `new Date`.

`Array.prototype` is not considered a plain object just like an array isn't
a plain object. JavaScript is a prototypical language and the prototype of
an array should be considered an array.

**Examples**:
```javascript
Oolong.isPlainObject({name: "John", age: 42}) // => true
Oolong.isPlainObject(Object.create(null)) // => true
Oolong.isPlainObject(Math) // => true
Oolong.isPlainObject([]) // => false
Oolong.isPlainObject(Array.prototype) // => false
Oolong.isPlainObject(new Date) // => false
Oolong.isPlainObject("John") // => false
```

<a name="Oolong.keys" />
### Oolong.keys(object)
Returns all enumerable keys of an object as an array.
Similar to `Object.keys`, but takes inherited properties into account.

**Examples**:
```javascript
Oolong.keys({name: "John", age: 32}) // => ["name", "age"]
```

<a name="Oolong.lookupGetter" />
### Oolong.lookupGetter(object, property)
Looks up and returns a getter on an object.  
Similar to [`Object.prototype.__lookupGetter__`][__lookupGetter__], but
works in a standards compliant way.  
Takes inherited getters into account, just like `__lookupGetter__`.  

[__lookupGetter__]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__lookupGetter__

**Examples**:
```javascript
var person = {birthyear: 1987}

Oolong.defineGetter(person, "age", function() {
  return new Date().getFullYear() - this.birthyear
})

Oolong.lookupGetter(person, "age") // Returns the function above.
```

<a name="Oolong.lookupSetter" />
### Oolong.lookupSetter(object, property)
Looks up and returns a setter on an object.  
Similar to [`Object.prototype.__lookupSetter__`][__lookupSetter__], but
works in a standards compliant way.  
Takes inherited setters into account, just like `__lookupSetter__`.  

[__lookupSetter__]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__lookupSetter__

**Examples**:
```javascript
var person = {birthyear: 1987}

Oolong.defineSetter(person, "age", function(age) {
  this.birthyear = new Date().getFullYear() - age
})

Oolong.lookupSetter(person, "age") // Returns the function above.
```

<a name="Oolong.map" />
### Oolong.map(object, callback, [thisArg])
Maps all enumerable property values and returns a new object.

The function will be called with arguments `value`, `key` and `object` and
bound to `thisArg`.

**Examples**:
```javascript
var obj = {a: 1, b: 2, c: 3}
Oolong.map(obj, function(value, key) { return value * 2 })
// => {a: 2, b: 4, c: 6}
```

<a name="Oolong.mapKeys" />
### Oolong.mapKeys(object, callback, [thisArg])
Transforms all enumerable keys and returns a new object.

The function will be called with arguments `key`, `value` and `object` and
bound to `thisArg`.

**Examples**:
```javascript
var person = {name: "John", age: 32}
Oolong.mapKeys(person, function(key) { return key.toUpperCase() })
// => {NAME: "John", AGE: 32}
```

<a name="Oolong.merge" />
### Oolong.merge(target, source...)
Assigns all enumerable properties on `source` objects to `target`
recursively.  
Only plain objects a merged. Refer to
[`Oolong.isPlainObject`](#Oolong.isPlainObject) for the definition of
a plain object. Does not modify anything in the source objects.

Think of it as _extending_ the first object step by step with others.

**Examples**:
```javascript
var person = {name: "John", attributes: {age: 42}}
Oolong.merge(person, {attributes: {height: 190}})
person // => {name: "John", attributes: {age: 42, height: 190}}
```

<a name="Oolong.object" />
### Oolong.object(keys, callback, [thisArg])
Returns a new object with keys taken from the array `keys` and values
from the result of calling the given function with `key`, `index` and
`keys`.  
It's like the reverse of indexing an array.

**Examples**:
```javascript
var names = ["Alice", "Bob", "Charlie"]
var lengths = Oolong.object(names, function(name) { return name.length })
lengths // => {Alice: 5, Bob: 3, Charlie: 7}
```

<a name="Oolong.ownKeys" />
### Oolong.ownKeys(object)
Returns all enumerable _own_ keys of an object as an array.  
Same as `Object.keys`, really.

**Examples**:
```javascript
var person = Object.create({name: "John"})
person.age = 42
Oolong.ownKeys(person) // => ["age"]
```

<a name="Oolong.pick" />
### Oolong.pick(object, keys...)
Filters the keys of an object to only those given as `keys...`.  
Only keys that exist in `object` are included.

**Examples**:
```javascript
var person = {name: "Alice", email: "alice@example.com", age: 42}
Oolong.pick(person, "name", "age") // => {name: "Alice", age: 42}
```

<a name="Oolong.pickDeep" />
### Oolong.pickDeep(object, keys...)
Filters the keys of an object to only those given as `keys...` with support
for nested keys in an array (`["a", "b", "c"]`).  
Only keys that exist in `object` are included.

If you'd like to use some other path syntax, feel free to preprocess your
keys before passing them to `pickDeep`. For example, for a period-separated
syntax (`a.b.c`), use a helper:

```javascript
function path(s) { return s.split(".") }
Oolong.pickDeep(person, "name", path("address.country"))
```

**Examples**:
```javascript
var person = {name: "Alice", address: {country: "UK", street: "Downing"}}
var obj = Oolong.pickDeep(person, "name", ["address", "country"])
obj // => {name: "Alice", address: {country: "UK"}}
```

<a name="Oolong.pluck" />
### Oolong.pluck(object, key)
Returns a new object with the same keys, but with values being the value's
property `key`.  
In other words, it's the same as `Oolong.map(obj, Oolong.property(key))`.

**Examples**:
```javascript
var people = {
  a: {name: "Alice"},
  b: {name: "Bob"},
  c: {name: "Charlie"}
}

Oolong.pluck(people, "name") // => {a: "Alice", b: "Bob", c: "Charlie"}
```

<a name="Oolong.property" />
### Oolong.property(key)
Returns a function that returns the given property of an object.

**Examples**:
```javascript
var getName = Oolong.property("name")
getName({name: "John"}) // => "John
```

<a name="Oolong.reject" />
### Oolong.reject(object, callback, [thisArg])
Rejects all enumerable properties and returns a new object without those
properties for which the given function returned truthy for.  
Opposite of [`filter`](#Oolong.filter).

The function will be called with arguments `value`, `key` and `object` and
bound to `thisArg`.

**Examples**:
```javascript
var obj = {a: 1, b: 2, c: 3, d: 4}
Oolong.reject(obj, function(value, key) { return value % 2 == 0 })
// => {a: 1, c: 3}
```

<a name="Oolong.setPrototypeOf" />
### Oolong.setPrototypeOf(object, prototype)
Set the prototype of the given object to the given prototype.  
Pass `null` or another object for the prototype.  
Returns `object`.

Uses `Object.setPrototypeOf` if it exists. Otherwise uses a polyfill.

**Examples**:
```javascript
var person = {name: "Unnamed", age: 42}
var mike = Oolong.setPrototypeOf({name: "Mike"}, person)
mike.name // => "Mike
mike.age  // => 42
```

<a name="Oolong.values" />
### Oolong.values(object)
Returns all enumerable property values as an array.

**Examples**:
```javascript
Oolong.values({name: "John", age: 32}) // => ["John", 32]
```

<a name="Oolong.wrap" />
### Oolong.wrap(value, key)
Wraps a given value in an object under the specified key.  
Works also with [ECMAScript 6 Symbol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol).

**Examples**:
```javascript
Oolong.wrap("John", "name") // => {name: "John"}
```
