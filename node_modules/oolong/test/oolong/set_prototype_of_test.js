var O = require("../..")
var demand = require("must")

describe("Oolong.setPrototypeOf", function() {
  it("must return object", function() {
    var obj = {}
    O.setPrototypeOf(obj, {}).must.equal(obj)
  })

  it("must set object's prototype given object prototype", function() {
    var obj = {}
    var prototype = {}
    O.setPrototypeOf(obj, prototype)
    Object.getPrototypeOf(obj).must.equal(prototype)
  })

  it("must set object's prototype given null prototype", function() {
    var obj = {}
    O.setPrototypeOf(obj, null)
    demand(Object.getPrototypeOf(obj)).be.null()
  })

  it("must throw given undefined", function() {
    O.setPrototypeOf.bind(null, undefined, {}).must.throw(TypeError)
  })

  it("must throw given null", function() {
    O.setPrototypeOf.bind(null, null, {}).must.throw(TypeError)
  })

  it("must ignore if given a number primitive", function() {
    O.setPrototypeOf(42, {}).must.equal(42)
  })

  it("must throw given a non-extensible object", function() {
    var obj = Object.preventExtensions({})
    O.setPrototypeOf.bind(null, obj, {}).must.throw(TypeError)
  })

  it("must throw given a sealed object", function() {
    var obj = Object.seal({})
    O.setPrototypeOf.bind(null, obj, {}).must.throw(TypeError)
  })

  it("must throw given a frozen object", function() {
    var obj = Object.freeze({})
    O.setPrototypeOf.bind(null, obj, {}).must.throw(TypeError)
  })
})
