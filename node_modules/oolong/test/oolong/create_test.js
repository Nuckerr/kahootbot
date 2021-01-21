var O = require("../..")
var demand = require("must")

describe("Oolong.create", function() {
  it("must return an object inheriting from the one given", function() {
    var prototype = {}
    var obj = O.create(prototype)
    Object.getPrototypeOf(obj).must.equal(prototype)
  })

  it("must return an object inheriting from null if given", function() {
    var obj = O.create(null)
    demand(Object.getPrototypeOf(obj)).be.null()
  })

  it("must assign properties to target from one source", function() {
    O.create({}, {name: "John"}).must.eql({name: "John"})
  })

  it("must assign properties to target from two sources", function() {
    var obj = O.create({}, {name: "John"}, {age: 13})
    obj.must.eql({name: "John", age: 13})
  })

  it("must throw TypeError given nothing", function() {
    var err
    try { O.create() } catch (ex) { err = ex }
    err.must.be.an.instanceof(TypeError)
  })

  it("must not modify the given prototype", function() {
    var prototype = {name: ""}
    O.create(prototype, {name: "John"})
    prototype.must.eql({name: ""})
  })
})
