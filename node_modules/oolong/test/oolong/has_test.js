var O = require("../..")

describe("Oolong.has", function() {
  it("must return false given an object without property", function() {
    O.has({}, "name").must.be.false()
  })

  it("must return true given an object with property", function() {
    O.has({"name": "John"}, "name").must.be.true()
  })

  it("must return true given a property set undefined", function() {
    O.has({"name": undefined}, "name").must.be.true()
  })

  it("must return true given an object with an inherited property",
    function() {
    O.has(Object.create({name: "John"}), "name").must.be.true()
  })
})
