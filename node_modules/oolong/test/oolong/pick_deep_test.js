var O = require("../..")

describe("Oolong.pickDeep", function() {
  it("must return a new object with given key", function() {
    var obj = O.pickDeep({name: "Alice", age: 42, height: 100}, "name")
    obj.must.eql({name: "Alice"})
  })

  it("must return a new object with given 2nd level key", function() {
    var person = {name: "Alice", address: {country: "UK", street: "Downing"}}
    var obj = O.pickDeep(person, "name", ["address", "country"])
    obj.must.eql({name: "Alice", address: {country: "UK"}})
  })

  it("must return a new object with given 3rd level key", function() {
    var children = {Bob: {name: "Bob", age: "13"}}
    var person = {name: "Alice", children: children}
    var obj = O.pickDeep(person, "name", ["children", "Bob", "name"])
    obj.must.eql({name: "Alice", children: {Bob: {name: "Bob"}}})
  })

  it("must return a new object with given keys", function() {
    var obj = O.pickDeep({name: "Alice", age: 42, height: 100}, "name", "age")
    obj.must.eql({name: "Alice", age: 42})
  })

  it("must return a new object with given 2nd level keys", function() {
    var address = {country: "UK", street: "Downing", apartment: 10}
    var person = {name: "Alice", address: address}
    var obj = O.pickDeep(person,
                         "name",
                         ["address", "country"],
                         ["address", "street"])
    obj.must.eql({name: "Alice", address: {country: "UK", street: "Downing"}})
  })

  it("must return an empty object given no keys", function() {
    O.pickDeep({name: "Alice", age: 42}).must.eql({})
  })

  it("must return property even if properties inherited", function() {
    var person = Object.create({name: "Alice", height: 100})
    person.age = 42
    O.pickDeep(person, "name", "age").must.eql({name: "Alice", age: 42})
  })

  it("must not change the given object", function() {
    var obj = {name: "Alice", age: 42}
    O.pickDeep(obj, "name").must.not.equal(obj)
    obj.must.eql({name: "Alice", age: 42})
  })

  it("must not return non-existent keys", function() {
    var obj = O.pickDeep({name: "Alice", age: 42}, "name", "height")
    obj.must.eql({name: "Alice"})
  })

  it("must not return non-existent 2nd level keys", function() {
    var person = {name: "Alice", address: {country: "UK", street: "Downing"}}
    var obj = O.pickDeep(person, "name", ["address", "apartment"])
    obj.must.eql({name: "Alice"})
  })

  it("must not return non-existent 3rd level keys", function() {
    var children = {Bob: {name: "Bob", age: "13"}}
    var person = {name: "Alice", children: children}
    var obj = O.pickDeep(person, "name", ["children", "Bob", "height"])
    obj.must.eql({name: "Alice"})
  })
})
