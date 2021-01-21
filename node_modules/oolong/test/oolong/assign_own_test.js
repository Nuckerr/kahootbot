var O = require("../..")
var demand = require("must")

describe("Oolong.assignOwn", function() {
  it("must return undefined given nothing", function() {
    demand(O.assignOwn()).be.undefined()
  })

  it("must return null given null", function() {
    demand(O.assignOwn(null)).be.null()
  })

  it("must return undefined given undefined and a source", function() {
    demand(O.assignOwn(undefined, {name: "John"})).be.undefined()
  })

  it("must return null given null and a source", function() {
    demand(O.assignOwn(null, {name: "John"})).be.null()
  })

  it("must return target given no source", function() {
    var obj = {}
    O.assignOwn(obj).must.equal(obj)
  })

  it("must return target given one source", function() {
    var obj = {}
    O.assignOwn(obj, {name: "John"}).must.equal(obj)
  })

  it("must assign properties to target from one source", function() {
    O.assignOwn({}, {name: "John"}).must.eql({name: "John"})
  })

  it("must assign properties to target from two sources", function() {
    O.assignOwn({}, {name: "John"}, {age: 13}).must.eql({name: "John", age: 13})
  })

  it("must overwrite property with later source", function() {
    O.assignOwn({}, {name: "John"}, {name: "Mike"}).must.eql({name: "Mike"})
  })

  it("must not change target given no source", function() {
    O.assignOwn({name: "John"}).must.eql({name: "John"})
  })

  it("must not assign properties from inherited sources", function() {
    O.assignOwn({}, Object.create({name: "John"})).must.eql({})
  })

  it("must not assign unenumerable properties", function() {
    var source = Object.defineProperty({}, "name", {value: "John"})
    O.assignOwn({}, source).must.eql({})
  })

  it("must assign properties with undefined value", function() {
    O.assignOwn({name: "John"}, {name: undefined}).must.eql({name: undefined})
  })
})
