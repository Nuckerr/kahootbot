var O = require("../..")
var Sinon = require("sinon")
var toUpperCase = Function.call.bind(String.prototype.toUpperCase)

describe("Oolong.mapKeys", function() {
  it("must transform keys", function() {
    var obj = O.mapKeys({name: "John", age: 32}, toUpperCase)
    obj.must.eql({NAME: "John", AGE: 32})
  })

  it("must transform keys of inherited properties", function() {
    var obj = O.mapKeys(Object.create({name: "John", age: 32}), toUpperCase)
    obj.must.eql({NAME: "John", AGE: 32})
  })

  it("must call function with key, value and object", function() {
    var obj = {name: "John"}
    var spy = Sinon.spy()
    var context = {}
    O.mapKeys(obj, spy, context)

    spy.callCount.must.equal(1)
    spy.firstCall.args[0].must.equal("name")
    spy.firstCall.args[1].must.equal("John")
    spy.firstCall.args[2].must.equal(obj)
    spy.firstCall.thisValue.must.equal(context)
  })

  it("must not change the given object", function() {
    var obj = {name: "John"}
    O.mapKeys(obj, function() { return "NAME" }).must.not.equal(obj)
    obj.must.eql({name: "John"})
  })
})
