var O = require("../..")
var Sinon = require("sinon")

describe("Oolong.each", function() {
  it("must call function with value, key and object", function() {
    var obj = {name: "John", age: 42, height: 190}
    var spy = Sinon.spy()
    var context = {}
    O.each(obj, spy, context)

    spy.callCount.must.equal(3)
    spy.args[0][0].must.equal("John")
    spy.args[0][1].must.equal("name")
    spy.args[0][2].must.equal(obj)
    spy.thisValues[0].must.equal(context)
    spy.args[1][0].must.equal(42)
    spy.args[1][1].must.equal("age")
    spy.args[1][2].must.equal(obj)
    spy.thisValues[1].must.equal(context)
    spy.args[2][0].must.equal(190)
    spy.args[2][1].must.equal("height")
    spy.args[2][2].must.equal(obj)
    spy.thisValues[2].must.equal(context)
  })

  it("must call function for inherited properties", function() {
    var obj = Object.create({name: "John"})
    obj.age = 42
    var spy = Sinon.spy()
    var context = {}
    O.each(obj, spy, context)

    spy.callCount.must.equal(2)
    spy.args[0][0].must.equal(42)
    spy.args[0][1].must.equal("age")
    spy.args[0][2].must.equal(obj)
    spy.thisValues[0].must.equal(context)
    spy.args[1][0].must.equal("John")
    spy.args[1][1].must.equal("name")
    spy.args[1][2].must.equal(obj)
    spy.thisValues[0].must.equal(context)
  })

  it("must return the given object", function() {
    var obj = {}
    O.each(obj, noop).must.equal(obj)
  })

  it("must not change the given object", function() {
    var obj = {name: "John"}
    O.each(obj, noop)
    obj.must.eql({name: "John"})
  })
})

function noop() {}
