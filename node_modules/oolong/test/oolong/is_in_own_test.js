var O = require("../..")

describe("Oolong.isInOwn", function() {
  it("must be an alias to .hasOwn", function() {
    O.isInOwn.must.equal(O.hasOwn)
  })
})
