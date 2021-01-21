var O = require("../..")

describe("Oolong.wrap", function() {
  it("must wrap given value with string", function() {
    O.wrap(42, "answer").must.eql({answer: 42})
  })

  if (typeof Symbol != "undefined")
  it("must wrap given value with symbol ", function() {
    var symbol = Symbol()
    var obj = O.wrap(42, symbol)
    obj.must.eql({})
    obj[symbol].must.equal(42)
  })
})
