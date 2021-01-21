var O = require("../..")

describe("Oolong.isObject", function() {
  it("must return true given an object literal", function() {
    O.isObject({}).must.be.true()
  })

  it("must return true given an object inheriting from a literal",
    function() {
    O.isObject(Object.create({})).must.be.true()
  })

  it("must return true given Object.prototype", function() {
    O.isObject(Object.prototype).must.be.true()
  })

  it("must return true given an Object inheritng from null", function() {
    O.isObject(Object.create(null)).must.be.true()
  })

  it("must return true given Math", function() {
    O.isObject(Math).must.be.true()
  })

  it("must return true given JSON", function() {
    O.isObject(JSON).must.be.true()
  })

  // Arguments have all the qualities of an object, so it might as well be one.
  it("must return true given arguments", function() {
    O.isObject(arguments).must.be.true()
  })

  it("must return false given undefined", function() {
    O.isObject(undefined).must.be.false()
  })

  it("must return false given null", function() {
    O.isObject(null).must.be.false()
  })

  it("must return false given a number", function() {
    O.isObject(1).must.be.false()
  })

  it("must return false given a string", function() {
    O.isObject("").must.be.false()
  })

  it("must return true given an array", function() {
    O.isObject([]).must.be.true()
  })

  it("must return false given a function", function() {
    O.isObject(noop).must.be.false()
  })

  it("must return true given a regular expression", function() {
    O.isObject(/./).must.be.true()
  })

  it("must return true given an instance of Date", function() {
    O.isObject(new Date).must.be.true()
  })

  it("must return true given an instance of a class", function() {
    function Model() {}
    O.isObject(new Model).must.be.true()
  })
})

function noop() {}
