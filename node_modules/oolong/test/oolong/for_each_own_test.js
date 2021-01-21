var O = require("../..")

describe("Oolong.forEachOwn", function() {
  it("must be an alias to .eachOwn", function() {
    O.forEachOwn.must.equal(O.eachOwn)
  })
})
