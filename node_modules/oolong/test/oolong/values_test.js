var O = require("../..")

describe("Oolong.values", function() {
  it("must return all enumerable values of an object", function() {
    O.values({a: 1, b: 2}).must.eql([1, 2])
  })

  it("must return inherited enumerable values of an object", function() {
    O.values(Object.create({a: 1, b: 2})).must.eql([1, 2])
  })
})
