## 1.15.1 (Jul 21, 2016)
- Fixes [`Oolong.create`][create] to not mutate the prototype argument under global strict mode when given objects to assign to it.  
  This affected only people running their JavaScript engine (like V8) under global strict mode (`--use-strict`), which seems very rare.

## 1.15.0 (Jul 15, 2016)
- Adds [`Oolong.assignOwn`][assignOwn].

[assignOwn]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.assignOwn

## 1.14.1 (Nov 12, 2015)
- Changes [`Oolong.pickDeep`][pickDeep] to take an array of keys (`["a", "b",
  "c"]`) instead of a string with embedded periods (`a.b.c`).  
  As using periods initially was a brain fluke noticed shortly after releasing
  v1.14, increasing only the patch version number.

## 1.14.0 (Nov 12, 2015)
- Adds [`Oolong.pick`][pick].
- Adds [`Oolong.pickDeep`][pickDeep].

[pick]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.pick
[pickDeep]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.pickDeep

## 1.13.0 (Jul 24, 2015)
- Adds [`Oolong.property`][property].
- Adds [`Oolong.object`][object].
- Adds [`Oolong.pluck`][pluck].

[property]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.property
[object]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.object
[pluck]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.pluck

## 1.12.0 (Jun 26, 2015)
- Adds [`Oolong.setPrototypeOf`][setPrototypeOf].

[setPrototypeOf]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.setPrototypeOf

## 1.11.1 (Jun 24, 2015)
- Fixes [`Oolong.isPlainObject`][isPlainObject] to return `false` for
  `Array.prototype`.  
  JavaScript is a prototypical language after all and the prototype of an array
  is an array.

## 1.11.0 (Jun 14, 2015)
- Adds [`Oolong.lookupGetter`][lookupGetter].
- Adds [`Oolong.lookupSetter`][lookupSetter].

[lookupGetter]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.lookupGetter
[lookupSetter]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.lookupSetter

## 1.10.0 (Jun 12, 2015)
- Adds [`Oolong.isObject`][isObject].

[isObject]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.isObject

## 1.9.0 (Jun 1, 2015)
- Adds [`Oolong.wrap`][wrap].

[wrap]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.wrap

## 1.8.0 (May 29, 2015)
- Adds [`Oolong.defineGetter`][defineGetter].
- Adds [`Oolong.defineSetter`][defineSetter].

[defineGetter]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.defineGetter
[defineSetter]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.defineSetter

## 1.7.0 (Apr 15, 2015)
- Renames Objectware to Oolong.

## 1.6.0 (Feb 19, 2015)
- Adds [`Oolong.create`][create].
- Adds [`Oolong.defaults`][defaults].

[create]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.create
[defaults]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.defaults

## 1.5.0 (Feb 10, 2015)
- Adds [`Oolong.each`][each].
- Adds [`Oolong.eachOwn`][eachOwn].
- Adds [`Oolong.forEach`][forEach].
- Adds [`Oolong.forEachOwn`][forEachOwn].
- Adds [`Oolong.has`][has].
- Adds [`Oolong.hasOwn`][hasOwn].
- Adds [`Oolong.isInOwn`][isInOwn].
- Adds [`Oolong.isOwnEmpty`][isOwnEmpty].
- Adds [`Oolong.ownKeys`][ownKeys].

[each]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.each
[eachOwn]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.eachOwn
[forEach]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.forEach
[forEachOwn]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.forEachOwn
[has]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.has
[hasOwn]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.hasOwn
[isInOwn]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.isInOwn
[isOwnEmpty]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.isOwnEmpty
[ownKeys]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.ownKeys

## 1.4.0 (Feb 8, 2015)
- Adds [`Oolong.reject`][reject].

[reject]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.reject

## 1.3.0 (Feb 8, 2015)
- Adds [`Oolong.isIn`][isIn].

[isIn]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.isIn

## 1.2.0 (Feb 7, 2015)
- Fixes [`Oolong.merge`][merge] to clone plain objects objects
  recursively.  
  Previously in some cases it cloned objects shallowly.
- Adds [`Oolong.cloneDeep`][cloneDeep].

[cloneDeep]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.cloneDeep

## 1.1.0 (Feb 7, 2015)
- Adds [`Oolong.isPlainObject`][isPlainObject].
- Adds [`Oolong.merge`][merge].

[isPlainObject]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.isPlainObject
[merge]: https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.merge

## 1.0.0 (Jan 13, 2015)
- Perfectly objective.
