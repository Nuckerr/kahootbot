var O = require("../..")
var demand = require("must")

describe("Oolong.defaults", function() {
  it("must return undefined given nothing", function() {
    demand(O.defaults()).be.undefined()
  })

  it("must return null given null", function() {
    demand(O.defaults(null)).be.null()
  })

  it("must return undefined given undefined and a source", function() {
    demand(O.defaults(undefined, {name: "John"})).be.undefined()
  })

  it("must return null given null and a source", function() {
    demand(O.defaults(null, {name: "John"})).be.null()
  })

  it("must return target given no source", function() {
    var obj = {}
    O.defaults(obj).must.equal(obj)
  })

  it("must return target given one source", function() {
    var obj = {}
    O.defaults(obj, {name: "John"}).must.equal(obj)
  })

  it("must assign properties to target from one source", function() {
    O.defaults({}, {name: "John"}).must.eql({name: "John"})
  })

  it("must assign properties to target from two sources", function() {
    O.defaults({}, {name: "John"}, {age: 13}).must.eql({name: "John", age: 13})
  })

  it("must not assign properties in Object.prototype", function() {
    O.defaults({}, {hasOwnProperty: true}).must.eql({})
  })

  it("must assign properties in Object.prototype when inheriting from null",
    function() {
    var obj = O.defaults(Object.create(null), {hasOwnProperty: true})
    demand(obj).eql({hasOwnProperty: true})
  })

  it("must not overwrite property if target already has it", function() {
    O.defaults({name: "John"}, {name: "Mike"}).must.eql({name: "John"})
  })

  it("must not overwrite property with later source", function() {
    O.defaults({}, {name: "John"}, {name: "Mike"}).must.eql({name: "John"})
  })

  it("must not change target given no source", function() {
    O.defaults({name: "John"}).must.eql({name: "John"})
  })

  it("must assign properties from inherited sources", function() {
    O.defaults({}, Object.create({name: "John"})).must.eql({name: "John"})
  })

  it("must not assign unenumerable properties", function() {
    var source = Object.defineProperty({}, "name", {value: "John"})
    O.defaults({}, source).must.eql({})
  })

  it("must assign properties with undefined value", function() {
    O.defaults({}, {name: undefined}).must.eql({name: undefined})
  })
})
