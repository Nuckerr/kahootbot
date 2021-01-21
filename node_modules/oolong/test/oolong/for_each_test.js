var O = require("../..")

describe("Oolong.forEach", function() {
  it("must be an alias to .each", function() {
    O.forEach.must.equal(O.each)
  })
})
