var O = require("../..")
var Sinon = require("sinon")

describe("Oolong.filter", function() {
  function isEven(value) { return value % 2 == 0 }

  it("must filter properties", function() {
    O.filter({a: 1, b: 2, c: 3, d: 4}, isEven).must.eql({b: 2, d: 4})
  })

  it("must filter inherited properties", function() {
    var obj = Object.create({a: 1, b: 2, c: 3, d: 4})
    O.filter(obj, isEven).must.eql({b: 2, d: 4})
  })

  it("must call function with value, key and object", function() {
    var obj = {name: "John"}
    var spy = Sinon.spy()
    var context = {}
    O.filter(obj, spy, context)

    spy.callCount.must.equal(1)
    spy.firstCall.args[0].must.equal("John")
    spy.firstCall.args[1].must.equal("name")
    spy.firstCall.args[2].must.equal(obj)
    spy.firstCall.thisValue.must.equal(context)
  })

  it("must not change the given object", function() {
    var obj = {name: "John"}
    O.filter(obj, function() { return false }).must.not.equal(obj)
    obj.must.eql({name: "John"})
  })
})
