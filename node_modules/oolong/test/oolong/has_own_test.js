var O = require("../..")

describe("Oolong.hasOwn", function() {
  it("must return false given an object without property", function() {
    O.hasOwn({}, "name").must.be.false()
  })

  it("must return true given an object with property", function() {
    O.hasOwn({"name": "John"}, "name").must.be.true()
  })

  it("must return true given a property set undefined", function() {
    O.hasOwn({"name": undefined}, "name").must.be.true()
  })

  it("must return false given an object with an inherited property",
    function() {
    O.hasOwn(Object.create({name: "John"}), "name").must.be.false()
  })
})
