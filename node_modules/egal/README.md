Egal.js
=======
[![NPM version][npm-badge]](https://www.npmjs.com/package/egal)
[![Build status][travis-badge]](https://travis-ci.org/moll/js-egal)

Egal.js provides an `egal` function that tests **strict equality** (like
`===`), but adds support for built-in and custom [**value
objects**][value-object] in a **type-safe** way. It also has a `deepEgal`
function for comparing **plain objects and arrays recursively** or deeply
without giving up on type-safeness on the way. It also handles **circular
references**.

### Tour
When and why to use `egal` over the triple-equals `===` operator?

- When you need to compare the **semantic equivalence** of value objects without
  requiring the same object identity.  
  JavaScript's `==` and `===` consider two different `Date` or `RegExp` objects
  unequal, even if they mean the same thing.
- When you need to **compare custom value objects** in a type-safe way.  
  Value objects are objects that have a [`valueOf`][valueof] function. Egal.js
  makes sure the two objects with `valueOf` are actually from the same
  constructor.
- When you need to **compare objects or arrays recursively**, Egal.js has
  [`deepEgal`](#deep-comparison).

#### Primitives
A **primivitive** and its **boxed object** equivalent are considered different.
Allowing unexpected boxed objects (e.g. `new Boolean(false)`) through is risky
as they're extremely error prone (just think of `!!new Boolean(false)` returning
`true`).  Comparing two boxed objects of the same value, on the other hand, will
work.

#### Objects
**Non-value objects**, like `Array` or `Object`, are compared by `egal` as `===`
does it — based on object identity. For recursive or deep comparison, see
[`deepEgal`](#deep-comparison).

#### NaN
**NaN**s (not-a-number) are **not equal** (matching how `===` behaves). This is
because when you compare results of two mathematical operations that may both
end up as `NaN`, you might inadvertently assume the calculations went fine. If
you expect `NaN`, you can use JavaScript's built-in `isNaN` to test for that.

#### Zeros
**Negative and positive** zeros are **equal** (also matching how `===` behaves).
You might end up with unexpected negative zeros via various calculations and
when you don't need to distinguish between the two, you'll end up with too many
false negatives. If you need to handle negative zeros differently, see the
article on [Sameness in JavaScript][sameness].

#### Value Objects
**Value objects** can also return **compound values**. That is, you need not
return a single primitive value from `valueOf`, but merely a _more_ primitive
one. Those values are compared with [`deepEgal`](#deep-comparison).

```javascript
function Point(x, y) { this.x = x; this.y = y }
Point.prototype.valueOf = function() { return [this.x, this.y] }
egal(new Point(42, 69), new Point(42, 69)) // => true
egal(new Point(42, 69), new Point(13, 42)) // => false
```

[npm-badge]: https://img.shields.io/npm/v/egal.svg
[travis-badge]: https://travis-ci.org/moll/js-egal.png?branch=master
[value-object]: https://en.wikipedia.org/wiki/Value_object
[valueof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
[sameness]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Sameness


Installing
----------
### Installing on Node.js
```
npm install egal
```

### Installing for the browser
Egal.js doesn't yet have a build ready for the browser, but you might be able to
use [Browserify][browserify] to have it run there till then.

[browserify]: https://github.com/substack/node-browserify


Using
-----
Require Egal.js:
```javascript
var egal = require("egal")
```

Then proceed with comparions:
```javascript
egal(42, 42) // => true
egal(new String("Hello!"), "Hello") // => true
egal(new Date(2000, 5, 18), new Date(2000, 5, 18)) // => true
egal(/abc/i, /abc/i) // => true
```

### Value Objects
To make and compare custom value objects, create a new constructor and give its
prototype a `valueOf` function:
```javascript
function Song(name) { this.name = name }
Song.prototype.valueOf = function() { return this.name }

egal(new Song("Play Guitar"), new Song("Play Guitar")) // => true
egal(new Song("Play Guitar"), new Song("Crumblin' Down")) // => false
```

Egal.js makes sure the two instances are from the same constructor before
comparing their `valueOf` outputs:
```javascript
function Song(name) { this.name = name }
Song.prototype.valueOf = function() { return this.name }

function Car(name) { this.name = name }
Car.prototype.valueOf = function() { return this.name }

egal(new Song("KITT"), new Car("KITT")) // => false
```

Objects that are instances of a class (their `constructor` property set to
something other than `Object`) but lack a `valueOf` function, thereby not being
value objects, are compared by reference (`===`).

### Deep Comparison
As of v1.1.0, Egal.js comes with a recursive or deep comparison function named
`deepEgal`. It was mostly extracted from the [Must.js][must] testing library's
`eql` function.

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

The `deepEgal` function compares regular primitive values, model instances and
value objects just like `egal`.

Plain objects (those with no custom `constructor` property in their
prototype), are compared recursively by their enumerable properties.  Arrays are
compared recursively by their contents (iterating over `length`). See above
about [value objects](#value-objects) for more details on plain, instances and
value objects.

[must]: https://github.com/moll/js-must


License
-------
Egal.js is released under a *Lesser GNU Affero General Public License*, which in
summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g bug-fixes) you've made to this
  program.

For more convoluted language, see the `LICENSE` file.


About
-----
**[Andri Möll](http://themoll.com)** typed this and the code.  
[Monday Calendar](https://mondayapp.com) supported the engineering work.

If you find Egal.js needs improving, please don't hesitate to type to me now
at [andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/js-egal/issues
