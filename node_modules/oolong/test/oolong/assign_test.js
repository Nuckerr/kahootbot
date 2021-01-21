var O = require("../..")
var demand = require("must")

describe("Oolong.assign", function() {
  it("must return undefined given nothing", function() {
    demand(O.assign()).be.undefined()
  })

  it("must return null given null", function() {
    demand(O.assign(null)).be.null()
  })

  it("must return undefined given undefined and a source", function() {
    demand(O.assign(undefined, {name: "John"})).be.undefined()
  })

  it("must return null given null and a source", function() {
    demand(O.assign(null, {name: "John"})).be.null()
  })

  it("must return target given no source", function() {
    var obj = {}
    O.assign(obj).must.equal(obj)
  })

  it("must return target given one source", function() {
    var obj = {}
    O.assign(obj, {name: "John"}).must.equal(obj)
  })

  it("must assign properties to target from one source", function() {
    O.assign({}, {name: "John"}).must.eql({name: "John"})
  })

  it("must assign properties to target from two sources", function() {
    O.assign({}, {name: "John"}, {age: 13}).must.eql({name: "John", age: 13})
  })

  it("must overwrite property with later source", function() {
    O.assign({}, {name: "John"}, {name: "Mike"}).must.eql({name: "Mike"})
  })

  it("must not change target given no source", function() {
    O.assign({name: "John"}).must.eql({name: "John"})
  })

  it("must assign properties from inherited sources", function() {
    O.assign({}, Object.create({name: "John"})).must.eql({name: "John"})
  })

  it("must not assign unenumerable properties", function() {
    var source = Object.defineProperty({}, "name", {value: "John"})
    O.assign({}, source).must.eql({})
  })

  it("must assign properties with undefined value", function() {
    O.assign({name: "John"}, {name: undefined}).must.eql({name: undefined})
  })
})
