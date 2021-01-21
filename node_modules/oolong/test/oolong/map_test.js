var O = require("../..")
var Sinon = require("sinon")

describe("Oolong.map", function() {
  function double(value) { return value * 2 }

  it("must map properties", function() {
    O.map({a: 1, b: 2, c: 3}, double).must.eql({a: 2, b: 4, c: 6})
  })

  it("must map inherited properties", function() {
    var obj = Object.create({a: 1, b: 2, c: 3})
    O.map(obj, double).must.eql({a: 2, b: 4, c: 6})
  })

  it("must call function with value, key and object", function() {
    var obj = {name: "John"}
    var spy = Sinon.spy()
    var context = {}
    O.map(obj, spy, context)

    spy.callCount.must.equal(1)
    spy.firstCall.args[0].must.equal("John")
    spy.firstCall.args[1].must.equal("name")
    spy.firstCall.args[2].must.equal(obj)
    spy.firstCall.thisValue.must.equal(context)
  })

  it("must not change the given object", function() {
    var obj = {answer: 42}
    O.map(obj, double).must.not.equal(obj)
    obj.must.eql({answer: 42})
  })
})
