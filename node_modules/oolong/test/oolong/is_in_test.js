var O = require("../..")

describe("Oolong.isIn", function() {
  it("must be an alias to .has", function() {
    O.isIn.must.equal(O.has)
  })
})
