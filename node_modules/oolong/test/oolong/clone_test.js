var O = require("../..")
var demand = require("must")

describe("Oolong.clone", function() {
  it("must return undefined given nothing", function() {
    demand(O.clone()).be.undefined()
  })

  it("must return undefined given undefined", function() {
    demand(O.clone(undefined)).be.undefined()
  })

  it("must return null given null", function() {
    demand(O.clone(null)).be.null()
  })

  it("must return new object", function() {
    var obj = {}
    O.clone(obj).must.not.equal(obj)
  })

  it("must clone properties", function() {
    O.clone({name: "John", age: 42}).must.eql({name: "John", age: 42})
  })

  it("must assign nested properties", function() {
    var attrs = {age: 42}
    var obj = O.clone({name: "John", attrs: attrs})
    obj.attrs.must.equal(attrs)
  })

  it("must assign functions", function() {
    function fn() {}
    O.clone({fn: fn}).must.eql({fn: fn})
  })

  it("must clone properties from inherited sources", function() {
    O.clone(Object.create({name: "John"})).must.eql({name: "John"})
  })

  it("must not clone unenumerable properties", function() {
    var source = Object.defineProperty({}, "name", {value: "John"})
    O.clone(source).must.eql({})
  })

  // Just to ensure the target isn't shared between invocations.
  it("must clone properties when called twice", function() {
    O.clone({name: "John"})
    O.clone({age: 42}).must.eql({age: 42})
  })
})
