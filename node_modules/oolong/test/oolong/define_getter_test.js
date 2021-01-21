var O = require("../..")

describe("Oolong.defineGetter", function() {
  it("must return object", function() {
    var obj = {}
    O.defineGetter(obj, "name", getter).must.equal(obj)
  })

  it("must define a getter", function() {
    var obj = O.defineGetter({}, "name", getter)
    var desc = Object.getOwnPropertyDescriptor(obj, "name")
    desc.get.must.equal(getter)
    desc.enumerable.must.be.true()
    desc.configurable.must.be.true()
  })

  it("must not define setter", function() {
    var obj = O.defineGetter({}, "name", getter)
    var desc = Object.getOwnPropertyDescriptor(obj, "name")
    desc.must.have.property("set", undefined)
  })

  it("must not remove setter", function() {
    var obj = {}
    O.defineSetter(obj, "name", setter)
    O.defineGetter(obj, "name", getter)

    var desc = Object.getOwnPropertyDescriptor(obj, "name")
    desc.get.must.equal(getter)
    desc.set.must.equal(setter)
  })

  it("must define property as enumerable if previously so", function() {
    var obj = Object.defineProperty({}, "name", {
      writable: true, configurable: true, enumerable: true, value: "John"
    })

    O.defineGetter(obj, "name", getter)
    var desc = Object.getOwnPropertyDescriptor(obj, "name")
    desc.get.must.equal(getter)
    desc.enumerable.must.be.true()
    desc.configurable.must.be.true()
  })

  // This differs how __defineGetter__ works, but I'd say it's more in line
  // with how Object.defineProperty behaves.
  it("must not define property as enumerable if previously not", function() {
    var obj = Object.defineProperty({}, "name", {
      writable: true, configurable: true, value: "John"
    })

    O.defineGetter(obj, "name", getter)
    var desc = Object.getOwnPropertyDescriptor(obj, "name")
    desc.get.must.equal(getter)
    desc.enumerable.must.be.false()
    desc.configurable.must.be.true()
  })
})

function setter() {}
function getter() {}
