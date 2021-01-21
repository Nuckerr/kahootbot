var O = require("../..")
var demand = require("must")

describe("Oolong.lookupGetter", function() {
  it("must lookup a getter", function() {
    var obj = Object.defineProperty({}, "name", {get: getter})
    O.lookupGetter(obj, "name").must.equal(getter)
  })

  it("must lookup a getter of an inherited property", function() {
    var obj = Object.defineProperty({}, "name", {get: getter})
    O.lookupGetter(Object.create(obj), "name").must.equal(getter)
  })

  it("must return undefined given no getter", function() {
    demand(O.lookupGetter({}, "name")).be.undefined()
  })

  it("must not lookup setter", function() {
    var obj = Object.defineProperty({}, "name", {set: setter})
    demand(O.lookupGetter(obj, "name")).be.undefined()
  })

  // NOTE: This test was broken in V8 versions between 3.28.73 (Node v0.12.2)
  // and 3.28.71.19 (Node v0.12.7).  Not sure if it's intentional.
  // https://code.google.com/p/v8/issues/detail?id=4321
  xit("must return undefined given an own property with value", function() {
    var obj = Object.defineProperty({}, "name", {get: getter})
    var child = Object.create(obj, {name: {value: "John", configurable: true}})
    child.name.must.equal("John")
    demand(O.lookupGetter(child, "name")).be.undefined()
  })
})

function setter() {}
function getter() {}
