## 1.3.0 (Sep 22, 2015)
- Adds support for calling `deepEgal` with a custom comparison function.  
  Right now this is an advanced feature with its API not set in stone.

## 1.2.0 (Sep 21, 2015)
- Fixes `deepEgal` to consider `Array.prototype` equivalent to an empty array.
  JavaScript is a prototypical language after all and the prototype of an array
  is an array.
- Fixes `egal` to consider two objects inheriting from `null` without
  `constructor` properties, but `valueOf` functions, as plain objects and not
  as value objects.

- Adds support for comparing value objects that return compound values from
  their `valueOf` function. That is, you no longer need to return a single
  primitive value from `valueOf`, but merely a _more_ primitive one than before:

  ```javascript
  function Point(x, y) { this.x = x; this.y = y }
  Point.prototype.valueOf = function() { return [this.x, this.y] }
  egal(new Point(42, 69), new Point(42, 69)) // => true
  egal(new Point(42, 69), new Point(13, 42)) // => false
  ```

## 1.1.0 (Jun 13, 2015)
- Adds `deepEgal` for comparing plain objects and arrays recursively.  
  It's still type-safe, so value objects and instances of classes nested in
  plain objects as compared as `egal` — by value if possible (same constructor
  and has a `valueOf` function), by reference (`===`) otherwise.

  ```javascript
  var deepEgal = require("egal").deepEgal
  function Model(name) { this.name = name }

  deepEgal(42, 42) // => true
  deepEgal({name: "John"}, {name: "John"}) // => true
  deepEgal({stats: {age: 13}}, {{stats: age: 13}}) // => true
  deepEgal([1, 2, 3], [1, 2, 3]) // => true
  deepEgal(new Model("John"), new Model("John")) // => false
  deepEgal(new Date(2000, 5), new Date(2000, 5)) // => true
  ```

## 1.0.0 (May 25, 2015)
- No longer considers a primitive and boxed object of the same value to be
  equivalent.  
  Two boxed objects of the same value will remain equivalent.

  ```javascript
  egal(true, new Boolean(true)) // => false
  egal(new Boolean(true), new Boolean(true)) // => true
  ```

  Boxed objects tend to be *very* error prone and it's best you stick to
  primitives only. The following is a small example of problems with boxed
  objects:

  ```javascript
  new String("a") == new String("a") // => false
  new Boolean(true) == new Boolean(true) // => false
  Boolean(new Boolean(false)) // => true
  !!(new Boolean(false)) // => true
  ```

## 0.1.337 (Nov 1, 2013)
- First public release. Brotherhood awakes!
