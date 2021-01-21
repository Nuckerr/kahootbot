var O = require("../..")
var demand = require("must")

describe("Oolong.lookupSetter", function() {
  it("must lookup a setter", function() {
    var obj = Object.defineProperty({}, "name", {set: setter})
    O.lookupSetter(obj, "name").must.equal(setter)
  })

  it("must lookup a setter of an inherited property", function() {
    var obj = Object.defineProperty({}, "name", {set: setter})
    O.lookupSetter(Object.create(obj), "name").must.equal(setter)
  })

  it("must return undefined given no setter", function() {
    demand(O.lookupSetter({}, "name")).be.undefined()
  })

  it("must not lookup getter", function() {
    var obj = Object.defineProperty({}, "name", {get: getter})
    demand(O.lookupSetter(obj, "name")).be.undefined()
  })

  // NOTE: This test was broken in V8 versions between 3.28.73 (Node v0.12.2)
  // and 3.28.71.19 (Node v0.12.7).  Not sure if it's intentional.
  // https://code.google.com/p/v8/issues/detail?id=4321
  xit("must return undefined given an own property with value", function() {
    var obj = Object.defineProperty({}, "name", {set: setter})
    var child = Object.create(obj, {name: {value: "John", configurable: true}})
    child.name.must.equal("John")
    demand(O.lookupSetter(child, "name")).be.undefined()
  })
})

function setter() {}
function getter() {}
