Kindof.js
=========
[![NPM version][npm-badge]](https://www.npmjs.com/package/kindof)
[![Build status][travis-badge]](https://travis-ci.org/moll/js-kindof)

Kindof.js **provides a single `kindof` function** that does what you'd expect
from `typeof` — gives you the proper semantic type regardless if the variable
was a **primitive** (`"Hello"`), a **built-in [value object][value-object]**
like (`new Date(2000, 5, 18)` or `/.*/`) or came from **another execution
context** (e.g. an array from another `<iframe>`).

### Tour
When and why should you use `kindof` over `typeof`?

- When you need a type check that returns `"null"` given the `null` value.  
  You might remember, JavaScript's `typeof` says `null` is an object.
- When you need to **differentiate** between **plain objects** (`{name:
  "John"}`) and **built-in value objects** (`new Date(2000, 5, 18)`).  
  A single `kindof(obj) == "date"` check makes that easy.  
- When there's a chance you might get an object from **another execution
  context**.  
  In the browser that might mean an object from another `<frame>`.  
  Different execution contexts have different built-in class instances, so you
  can't do `obj instanceof Date` safely.
- Kindof.js does not consider boxed objects (instances of `Boolean`, `Number`
  and `String`) to of the same type as their primitive counterparts. See below
  for why boxed objects are very error prone and should be avoided.

Kindof.js supports all ECMAScript **built-in types and primitives**:
`undefined`, `null`, `Boolean`, `Number`, `String`, `Symbol`, `RegExp`, `Date`,
`Array`, `Function` and plain old `Object`. Others, e.g. `Math` and `JSON`, are
considered just objects.  In general, objects that behave like **value objects**
(dates, regular expressions etc.) or proper arrays have a kind other than
`object`.

Please see the table below for the full list of kinds.

### Primitives and Boxed Objects
You might know, JavaScript has both primitive types and boxed object types for
booleans, numbers and strings. Primitives are what you get from code literals
(`true`, `42`, `"Hello"`) and from `JSON.parse`. Boxed objects tend to only
appear when someone explicitly calls their constructor (`new Boolean(false)`).

Boxed objects wouldn't be so bad, except JavaScript's equivalence operator
(`==`), for all its type coercions, doesn't handle them transparently. While you
can't compare other value types like dates and regular expressions with `==`
either, you won't make that mistake that easily. The following is a small
example of problems with boxed objects:

```javascript
new String("a") == new String("a") // => false
new Boolean(true) == new Boolean(true) // => false
Boolean(new Boolean(false)) // => true
!!(new Boolean(false)) // => true
```

If you still wish Kindof to consider boxed Boolean, Number and String types like
primitives (returning `"boolean"`, `"number"` and `"string"` respectively), feel
free to use [Kindof.js's v1 branch][v1] with `npm install kindof@1`.

[value-object]: https://en.wikipedia.org/wiki/Value_object
[v1]: https://github.com/moll/js-kindof/tree/v1
[npm-badge]: https://img.shields.io/npm/v/kindof.svg
[travis-badge]: https://travis-ci.org/moll/js-kindof.png?branch=master


Installing
----------
**Note**: Kindof.js follows [semantic versioning](http://semver.org/).

### Installing for the browser
Take the `kindof.js` file and source it at will.

### Installing on Node.js
Install with `npm install kindof`.  
And require with `var kindof = require("kindof")`.


Using
-----
Pass any object to `kindof` and compare its output to what you expect:
```javascript
kindof("Hello") // => "string"
kindof(new Date(2000, 5, 18)) // => "date"
```

A switch statement might help:
```javascript
switch (kindof(obj)) {
  case "null":   this.name = "Alfred"; break
  case "string": this.name = obj; break
  case "date": this.birthdate = obj; break
  default: throw new TypeError("Pardon, sir, came upon an unexpected type.")
}
```


Kinds
-----
The pattern is simple and follows `typeof`: besides primitives, built-in objects
that are **value objects** (dates, regular expressions etc.) or **real arrays**
are of a kind other than `object`. The `arguments` object, for example, is not
a proper array and is therefore an `object`.

Value                 | Kindof
----------------------|----------
`undefined           `| undefined
`null                `| null
`true                `| boolean
`false               `| boolean
`42                  `| number
`NaN                 `| number
`Infinity            `| number
`"Hello"             `| string
`Symbol()            `| symbol
`Symbol("forEach")   `| symbol
`Symbol.iterator     `| symbol
`/.*/                `| regexp
`new RegExp(".*")    `| regexp
`new Date            `| date
`[42, 69]            `| array
`function() {}       `| function
`{}                  `| object
`arguments           `| object
`new Boolean(true)   `| object
`new Number(42)      `| object
`new String("Hello") `| object
`new MyClass         `| object
`new Error           `| object
`Math                `| object
`JSON                `| object

**Subclassed objects**, such as subclassed arrays, are considered to be `object`
unless their internal `[[Class]]` property remains that of the original. For
ways to subclass properly, please see further reading below.


Further Reading
---------------
- The [`typeof` operator in ECMAScript 5.1][typeof-ecma].
- The [`typeof` operator as implemented by Firefox][typeof-firefox].
- Article on [subclassing `Array`][subclass] by [Juriy Zaytsev][juriy].

[typeof-ecma]: http://www.ecma-international.org/ecma-262/5.1/#sec-11.4.3
[typeof-firefox]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
[subclass]: http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/
[juriy]: http://perfectionkills.com


License
-------
Kindof.js is released under a *Lesser GNU Affero General Public License*, which
in summary means:

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

If you find Kindof.js needs improving, please don't hesitate to type to me now
at [andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/js-kindof/issues
