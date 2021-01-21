## 2.0.0 (May 25, 2015)
- Removes support for boxed objects (`new Boolean`, `new Number`, `new String`)
  and considers them just as objects.

  Boxed objects tend to be *very* error prone and it's best you stick to
  primitives only. The following is a small example of problems with boxed
  objects:

  ```javascript
  new String("a") == new String("a") // => false
  new Boolean(true) == new Boolean(true) // => false
  Boolean(new Boolean(false)) // => true
  !!(new Boolean(false)) // => true
  ```

  You can convert boxed objects to primitives by calling their `valueOf`
  function:
  ```javascript
  new String("Hello").valueOf() // => "Hello"
  ```

- Adds support for `Symbol`.
