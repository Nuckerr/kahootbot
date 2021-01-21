var O = require("../..")

describe("Oolong.isPlainObject", function() {
  it("must return true given an object literal", function() {
    O.isPlainObject({}).must.be.true()
  })

  it("must return true given an object inheriting from a literal",
    function() {
    O.isPlainObject(Object.create({})).must.be.true()
  })

  it("must return true given Object.prototype", function() {
    O.isPlainObject(Object.prototype).must.be.true()
  })

  it("must return true given an Object inheritng from null", function() {
    O.isPlainObject(Object.create(null)).must.be.true()
  })

  it("must return true given Math", function() {
    O.isPlainObject(Math).must.be.true()
  })

  it("must return true given JSON", function() {
    O.isPlainObject(JSON).must.be.true()
  })

  // Arguments have all the qualities of a plain object, so it might as well
  // be one.
  it("must return true given arguments", function() {
    O.isPlainObject(arguments).must.be.true()
  })

  it("must return false given undefined", function() {
    O.isPlainObject(undefined).must.be.false()
  })

  it("must return false given null", function() {
    O.isPlainObject(null).must.be.false()
  })

  it("must return false given a number", function() {
    O.isPlainObject(1).must.be.false()
  })

  it("must return true given a string", function() {
    O.isPlainObject("").must.be.false()
  })

  it("must return false given an array", function() {
    O.isPlainObject([]).must.be.false()
  })

  it("must return false given Array.prototype", function() {
    O.isPlainObject(Array.prototype).must.be.false()
  })

  it("must return false given a function", function() {
    O.isPlainObject(noop).must.be.false()
  })

  it("must return false given a regular expression", function() {
    O.isPlainObject(/./).must.be.false()
  })

  it("must return false given an instance of Date", function() {
    O.isPlainObject(new Date).must.be.false()
  })

  it("must return false given an instance of a class", function() {
    function Model() {}
    O.isPlainObject(new Model).must.be.false()
  })

  it("must return false given an object inheriting from an instance",
    function() {
    function Model() {}
    O.isPlainObject(Object.create(new Model)).must.be.false()
  })
})

function noop() {}
