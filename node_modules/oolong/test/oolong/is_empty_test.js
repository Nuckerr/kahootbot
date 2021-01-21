var O = require("../..")

describe("Oolong.isEmpty", function() {
  it("must return true given an empty object", function() {
    O.isEmpty({}).must.be.true()
  })

  it("must return false given an non-empty object", function() {
    O.isEmpty({name: "John"}).must.be.false()
  })

  it("must return false given an object with an inherited property",
    function() {
    O.isEmpty(Object.create({name: "John"})).must.be.false()
  })
})
