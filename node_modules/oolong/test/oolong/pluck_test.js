var O = require("../..")

describe("Oolong.pluck", function() {
  it("must return a new object with given property as value", function() {
    var people = O.pluck({
      a: {name: "Alice"},
      b: {name: "Bob"},
      c: {name: "Charlie"}
    }, "name")

    people.must.eql({a: "Alice", b: "Bob", c: "Charlie"})
  })

  it("must return property even if both object and its child inherited",
    function() {
    var people = O.pluck(Object.create({
      a: Object.create({name: "Alice"}),
      b: Object.create({name: "Bob"}),
      c: Object.create({name: "Charlie"})
    }), "name")

    people.must.eql({a: "Alice", b: "Bob", c: "Charlie"})
  })

  it("must not change the given object", function() {
    var obj = {a: "Alice"}
    O.pluck(obj, "name").must.not.equal(obj)
    obj.must.eql({a: "Alice"})
  })

  it("must return undefined for values given a non-existent property",
    function() {
    var people = O.pluck({a: {}, b: {}, c: {}}, "name")
    people.must.eql({a: undefined, b: undefined, c: undefined})
  })
})
