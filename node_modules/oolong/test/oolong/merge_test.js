var O = require("../..")
var demand = require("must")

describe("Oolong.merge", function() {
  it("must return undefined given nothing", function() {
    demand(O.merge()).be.undefined()
  })

  it("must return null given null", function() {
    demand(O.merge(null)).be.null()
  })

  it("must return undefined given undefined and a source", function() {
    demand(O.merge(undefined, {name: "John"})).be.undefined()
  })

  it("must return null given null and a source", function() {
    demand(O.merge(null, {name: "John"})).be.null()
  })

  it("must return target given no source", function() {
    var obj = {}
    O.merge(obj).must.equal(obj)
  })

  it("must return target given one source", function() {
    var obj = {}
    O.merge(obj, {name: "John"}).must.equal(obj)
  })

  it("must merge 2 plain objects", function() {
    var target = {name: "John"}
    O.merge(target, {age: 42}).must.eql({name: "John", age: 42})
  })

  it("must merge 3 plain objects", function() {
    var obj = O.merge({name: "John"}, {age: 42}, {height: 190})
    obj.must.eql({name: "John", age: 42, height: 190})
  })

  it("must merge two plain objects deeply", function() {
    var target = {name: "John", attributes: {age: 13}}
    var source = {attributes: {height: 190}}
    var obj = O.merge(target, source)
    obj.must.eql({name: "John", attributes: {age: 13, height: 190}})
  })

  it("must replace first object if second not an object", function() {
    var target = {attributes: {age: 13}}
    var source = {attributes: null}
    O.merge(target, source).must.eql({attributes: null})
  })

  it("must replace second object if first not an object", function() {
    var target = {attributes: null}
    var source = {attributes: {age: 13}}
    O.merge(target, source).must.eql({attributes: {age: 13}})
  })

  it("must not modify second sources objects", function() {
    var a = {attributes: {age: 13}}
    var b = {attributes: {height: 190}}
    O.merge({}, a, b)
    a.must.eql({attributes: {age: 13}})
  })

  it("must not modify deep second sources objects", function() {
    var a = {john: {attributes: {age: 13}}}
    var b = {john: {attributes: {height: 190}}}
    O.merge({}, a, b)
    a.must.eql({john: {attributes: {age: 13}}})
  })

  it("must assign non-plain objects directly", function() {
    var date = new Date
    var obj = O.merge({name: "John"}, {date: date})
    obj.date.must.equal(date)
  })

  it("must merge inherited properties", function() {
    var obj = O.merge({name: "John"}, Object.create({age: 42}))
    obj.must.eql({name: "John", age: 42})
  })

  it("must not assign unenumerable properties", function() {
    var source = Object.defineProperty({}, "name", {value: "John"})
    O.merge({}, source).must.eql({})
  })

  it("must assign properties with undefined value", function() {
    O.merge({name: "John"}, {name: undefined}).must.eql({name: undefined})
  })
})
