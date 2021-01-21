var O = require("../..")

describe("Oolong.defineSetter", function() {
  it("must return object", function() {
    var obj = {}
    O.defineSetter(obj, "name", setter).must.equal(obj)
  })

  it("must define a setter", function() {
    var obj = O.defineSetter({}, "name", setter)
    var desc = Object.getOwnPropertyDescriptor(obj, "name")
    desc.set.must.equal(setter)
    desc.enumerable.must.be.true()
    desc.configurable.must.be.true()
  })

  it("must not define getter", function() {
    var obj = O.defineSetter({}, "name", setter)
    var desc = Object.getOwnPropertyDescriptor(obj, "name")
    desc.must.have.property("get", undefined)
  })

  it("must not remove getter", function() {
    var obj = {}
    O.defineGetter(obj, "name", getter)
    O.defineSetter(obj, "name", setter)

    var desc = Object.getOwnPropertyDescriptor(obj, "name")
    desc.get.must.equal(getter)
    desc.set.must.equal(setter)
  })

  it("must define property as enumerable if previously so", function() {
    var obj = Object.defineProperty({}, "name", {
      writable: true, configurable: true, enumerable: true, value: "John"
    })

    O.defineSetter(obj, "name", setter)
    var desc = Object.getOwnPropertyDescriptor(obj, "name")
    desc.set.must.equal(setter)
    desc.enumerable.must.be.true()
    desc.configurable.must.be.true()
  })

  // This differs how __defineSetter__ works, but I'd say it's more in line
  // with how Object.defineProperty behaves.
  it("must not define property as enumerable if previously not", function() {
    var obj = Object.defineProperty({}, "name", {
      writable: true, configurable: true, value: "John"
    })

    O.defineSetter(obj, "name", setter)
    var desc = Object.getOwnPropertyDescriptor(obj, "name")
    desc.set.must.equal(setter)
    desc.enumerable.must.be.false()
    desc.configurable.must.be.true()
  })
})

function getter() {}
function setter() {}
