var O = require("../..")

describe("Oolong.pick", function() {
  it("must return a new object with given key", function() {
    var obj = O.pick({name: "Alice", age: 42, height: 100}, "name")
    obj.must.eql({name: "Alice"})
  })

  it("must return a new object with given keys", function() {
    var obj = O.pick({name: "Alice", age: 42, height: 100}, "name", "age")
    obj.must.eql({name: "Alice", age: 42})
  })

  it("must return an empty object given no keys", function() {
    O.pick({name: "Alice", age: 42}).must.eql({})
  })

  it("must return property even if properties inherited", function() {
    var person = Object.create({name: "Alice", height: 100})
    person.age = 42
    O.pick(person, "name", "age").must.eql({name: "Alice", age: 42})
  })

  it("must not change the given object", function() {
    var obj = {name: "Alice", age: 42}
    O.pick(obj, "name").must.not.equal(obj)
    obj.must.eql({name: "Alice", age: 42})
  })

  it("must not return non-existent keys", function() {
    var obj = O.pick({name: "Alice", age: 42}, "name", "height")
    obj.must.eql({name: "Alice"})
  })
})
