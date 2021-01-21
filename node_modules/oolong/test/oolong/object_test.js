var O = require("../..")
var Sinon = require("sinon")

describe("Oolong.object", function() {
  function lengthOf(value) { return value.length }

  it("must create object", function() {
    var obj = O.object(["Alice", "Bob", "Charlie"], lengthOf)
    obj.must.eql({Alice: 5, Bob: 3, Charlie: 7})
  })

  it("must call function with value, index and keys", function() {
    var keys = ["Alice"]
    var spy = Sinon.spy()
    var context = {}
    O.object(keys, spy, context)

    spy.callCount.must.equal(1)
    spy.firstCall.args[0].must.equal("Alice")
    spy.firstCall.args[1].must.equal(0)
    spy.firstCall.args[2].must.equal(keys)
    spy.firstCall.thisValue.must.equal(context)
  })

  it("must not change the given object", function() {
    var obj = ["Alice", "Bob", "Charlie"]
    O.object(obj, lengthOf).must.not.equal(obj)
    obj.must.eql(["Alice", "Bob", "Charlie"])
  })
})
