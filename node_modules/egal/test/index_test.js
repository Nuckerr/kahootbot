var Sinon = require("sinon")
var wrap = require("lodash.wrap")

describe("egal", function() {
  var egal = wrap(require(".."), function(orig, a, b) {
    var equal = orig(a, b)
    orig(b, a).must.equal(equal)
    return equal
  })

  require("./_null_test")(egal)
  require("./_boolean_test")(egal)
  require("./_number_test")(egal)
  require("./_string_test")(egal)
  require("./_symbol_test")(egal)
  require("./_regexp_test")(egal)
  require("./_date_test")(egal)
  require("./_function_test")(egal)
  require("./_object_with_value_of_test")(egal)

  it("must return false given an empty array and empty object", function() {
    // There was once an assertion library that considered {} equivalent to []
    // for months! This will *never* happen under my watch!
    egal({}, []).must.be.false()
  })

  describe("given Array", function() {
    it("must return true given same array", function() {
      var array = []
      egal(array, array).must.be.true()
    })

    it("must return false given empty arrays", function() {
      egal([], []).must.be.false()
    })

    it("must return false given equivalent arrays", function() {
      egal([1], [1]).must.be.false()
    })
  })

  describe("given Object", function() {
    it("must return true given same object", function() {
      var object = {}
      egal(object, object).must.be.true()
    })

    it("must return false given empty objects", function() {
      egal({}, {}).must.be.false()
    })

    it("must return false given equivalent objects", function() {
      egal({a: 1}, {a: 1}).must.be.false()
    })

    it("must return false given null inherited object", function() {
      var a = Object.create(null)
      var b = Object.create(null)
      egal(a, b).must.be.false()
    })

    it("must return false given instance and plain object", function() {
      function Model() {}
      egal(new Model, {}).must.be.false()
    })
  })
})

describe("deepEgal", function() {
  var deepEgal = wrap(require("..").deepEgal, function(orig, a, b, egal) {
    var equal = orig(a, b, egal)
    orig(b, a, egal).must.equal(equal)
    return equal
  })

  it("must return false given an empty array and empty object", function() {
    deepEgal({}, []).must.be.false()
  })

  require("./_null_test")(deepEgal)
  require("./_boolean_test")(deepEgal)
  require("./_number_test")(deepEgal)
  require("./_string_test")(deepEgal)
  require("./_symbol_test")(deepEgal)
  require("./_regexp_test")(deepEgal)
  require("./_date_test")(deepEgal)
  require("./_function_test")(deepEgal)
  require("./_object_with_constructor_test")(deepEgal)
  require("./_object_with_value_of_test")(deepEgal)

  describe("given Array", function() {
    it("must return true given equivalent empty arrays", function() {
      deepEgal([], []).must.be.true()
    })

    it("must return true given empty array and Array.prototype", function() {
      deepEgal([], Array.prototype).must.be.true()
    })

    it("must return true given equivalent arrays", function() {
      deepEgal([1], [1]).must.be.true()
      deepEgal([1, 2, 3], [1, 2, 3]).must.be.true()
    })

    it("must return true given identical arrays", function() {
      var array = []
      deepEgal(array, array).must.be.true()
    })

    it("must return false given an empty and non-empty array", function() {
      deepEgal([], [1]).must.be.false()
    })

    it("must return false given a smaller and a larger array", function() {
      deepEgal([1], [1, 2]).must.be.false()
    })

    it("must return true given equivalent nested arrays", function() {
      deepEgal([1, [2], 3], [1, [2], 3]).must.be.true()
    })

    it("must return false given unequivalent nested arrays", function() {
      deepEgal([1, [2], 3], [1, [42], 3]).must.be.false()
    })

    describe("with circular references", function() {
      it("must return true if equal", function() {
        var a = [1, 2, 3]
        a.push(a)
        a.push(5)

        var b = [1, 2, 3]
        b.push(b)
        b.push(5)

        deepEgal(a, b).must.be.true()
      })

      it("must return false if only one circular", function() {
        var a = [1, 2, 3]
        a.push(a)
        a.push(5)
        var b = [1, 2, 3, [1, 2, 3, 5], 5]
        deepEgal(a, b).must.be.false()
      })

      it("must return false if circular to different levels", function() {
        var a = [1, 2, 3]
        a.push(a)

        var b = [1, 2, 3]
        var bInside = [1, 2, 3]
        bInside.push(bInside)
        b.push(bInside)

        deepEgal(a, b).must.be.false()
      })
    })

    describe("with nested values", function() {
      function nestedDeepEgal(a, b) { return deepEgal([a], [b]) }

      require("./_null_test")(nestedDeepEgal)
      require("./_boolean_test")(nestedDeepEgal)
      require("./_number_test")(nestedDeepEgal)
      require("./_string_test")(nestedDeepEgal)
      require("./_symbol_test")(nestedDeepEgal)
      require("./_regexp_test")(nestedDeepEgal)
      require("./_date_test")(nestedDeepEgal)
      require("./_function_test")(nestedDeepEgal)
      require("./_object_with_constructor_test")(nestedDeepEgal)
      require("./_object_with_value_of_test")(nestedDeepEgal)
    })
  })

  describe("given Object", function() {
    it("must return true given identical objects", function() {
      var obj = {a: 42, b: 69}
      deepEgal(obj, obj).must.be.true()
    })

    it("must return true given empty objects", function() {
      deepEgal({}, {}).must.be.true()
    })

    it("must return false given an empty and filled object", function() {
      deepEgal({}, {name: "John"}).must.be.false()
    })

    it("must return false given a smaller and larger object", function() {
      var a = {a: 42, b: 69}
      var b = {a: 42}
      deepEgal(a, b).must.be.false()
    })

    // This was a bug I discovered on Jun 12, 2015 related to not comparing
    // keys equivalence before comparing their values.
    it("must return false given equal amount of keys undefined keys",
      function() {
      deepEgal({name: undefined}, {age: undefined}).must.be.false()
      deepEgal({name: undefined}, {age: 13}).must.be.false()
    })

    it("must return true given equivalent objects", function() {
      var a = {a: 42, b: 69}
      var b = {a: 42, b: 69}
      deepEgal(a, b).must.be.true()
    })

    it("must return false given objects with differently typed properties",
      function() {
      var a = {a: "42", b: 69}
      var b = {a: 42, b: 69}
      deepEgal(a, b).must.be.false()
    })

    it("must return true given an object with set constructor property",
      function() {
      var a = {constructor: 1337}
      var b = {constructor: 1337}
      deepEgal(a, b).must.be.true()
    })

    it("must return true given a deep object", function() {
      var a = {life: {love: 69}}
      var b = {life: {love: 69}}
      deepEgal(a, b).must.be.true()
    })

    it("must return false given an unequivalent deep object", function() {
      var a = {life: {love: 69}}
      var b = {life: {love: 42}}
      deepEgal(a, b).must.be.false()
    })

    describe("with circular references", function() {
      it("must return true if equal", function() {
        var a = {life: {love: 69}}
        a.self = a

        var b = ({life: {love: 69}})
        b.self = b

        deepEgal(a, b).must.be.true()
      })

      it("must return false if only one circular", function() {
        var a = ({life: {love: 69}})
        a.self = a

        var b = ({life: {love: 69}})
        b.self = {life: {love: 69}, self: {}}

        deepEgal(a, b).must.be.false()
      })

      it("must return false if circular to different levels", function() {
        var a = ({life: {love: 69}})
        a.self = a

        var b = ({life: {love: 69}})
        var bInside = ({life: {love: 69}})
        bInside.self = bInside
        b.self = bInside

        deepEgal(a, b).must.be.false()
      })
    })

    describe("with inheritance", function() {
      it("must return true given empty inherited objects", function() {
        var a = Object.create({})
        var b = Object.create({})
        deepEgal(a, b).must.be.true()
      })

      it("must return true given empty ancestored objects", function() {
        var a = Object.create(Object.create({}))
        var b = Object.create(Object.create({}))
        deepEgal(a, b).must.be.true()
      })

      it("must return true given empty objects inherited from null",
        function() {
        var a = Object.create(null)
        var b = Object.create(null)
        deepEgal(a, b).must.be.true()
      })

      it("must return true given empty objects ancestored from null",
        function() {
        var a = Object.create(Object.create(null))
        var b = Object.create(Object.create(null))
        deepEgal(a, b).must.be.true()
      })

      it("must return true given equivalent inherited objects", function() {
        var a = Object.create({love: 42})
        var b = Object.create({love: 42})
        deepEgal(a, b).must.be.true()
      })

      it("must return true given equivalent ancestored objects", function() {
        var a = Object.create(Object.create({love: 42}))
        var b = Object.create(Object.create({love: 42}))
        deepEgal(a, b).must.be.true()
      })

      it("must return true given equivalent objects inherited from null",
        function() {
        var a = Object.create(null, {life: {value: 42, enumerable: true}})
        var b = Object.create(null, {life: {value: 42, enumerable: true}})
        deepEgal(a, b).must.be.true()
      })

      it("must return true given equivalent objects ancestored from null",
        function() {
        var a = Object.create(Object.create(null, {
          life: {value: 42, enumerable: true}
        }))

        var b = Object.create(Object.create(null, {
          life: {value: 42, enumerable: true}
        }))

        deepEgal(a, b).must.be.true()
      })

      it("must return false given unequivalent inherited objects", function() {
        var a = Object.create({love: 42})
        var b = Object.create({love: 69})
        deepEgal(a, b).must.be.false()
      })

      it("must return false given unequivalent ancestored objects", function() {
        var a = Object.create(Object.create({love: 42}))
        var b = Object.create(Object.create({love: 69}))
        deepEgal(a, b).must.be.false()
      })

      it("must return false given unequivalent objects inherited from null",
        function() {
        var a = Object.create(null, {life: {value: 42, enumerable: true}})
        var b = Object.create(null, {life: {value: 69, enumerable: true}})
        deepEgal(a, b).must.be.false()
      })

      it("must return false given unequivalent objects ancestored from null",
        function() {
        var a = Object.create(Object.create(null, {
          life: {value: 42, enumerable: true}
        }))

        var b = Object.create(Object.create(null, {
          life: {value: 69, enumerable: true}
        }))

        deepEgal(a, b).must.be.false()
      })
    })

    describe("with nested values", function() {
      function nestedDeepEgal(a, b) { return deepEgal({key: a}, {key: b}) }

      require("./_null_test")(nestedDeepEgal)
      require("./_boolean_test")(nestedDeepEgal)
      require("./_number_test")(nestedDeepEgal)
      require("./_string_test")(nestedDeepEgal)
      require("./_symbol_test")(nestedDeepEgal)
      require("./_regexp_test")(nestedDeepEgal)
      require("./_date_test")(nestedDeepEgal)
      require("./_function_test")(nestedDeepEgal)
      require("./_object_with_constructor_test")(nestedDeepEgal)
      require("./_object_with_value_of_test")(nestedDeepEgal)
    })
  })

  describe("given egal function", function() {
    var deepEgal = require("..").deepEgal

    it("must be called with initial values", function() {
      var egal = Sinon.spy()
      var a = {}, b = {}
      deepEgal(a, b, egal)

      egal.callCount.must.equal(1)
      egal.args[0].length.must.equal(2)
      egal.args[0][0].must.equal(a)
      egal.args[0][1].must.equal(b)
    })

    it("must not recurse if function returns true", function() {
      var egal = Sinon.spy(function() { return true })
      deepEgal([42], [69], egal).must.be.true()
      egal.callCount.must.equal(1)
      egal.args[0].must.eql([[42], [69]])
    })

    it("must recurse if function returns null", function() {
      var egal = Sinon.spy(function() { return null })
      deepEgal([42], [42], egal).must.be.false()
      egal.callCount.must.equal(2)
      egal.args[0].must.eql([[42], [42]])
      egal.args[1].must.eql([42, 42])
    })

    it("must not recurse if function returns false", function() {
      var egal = Sinon.spy(function() { return false })
      deepEgal([42], [69], egal).must.be.false()
      egal.callCount.must.equal(1)
      egal.args[0].must.eql([[42], [69]])
    })

    it("must be called when recursing to arrays", function() {
      var egal = Sinon.spy()
      var a = {}, b = {}
      deepEgal([a], [b], egal)

      egal.callCount.must.equal(2)
      egal.args[1].length.must.equal(2)
      egal.args[1][0].must.equal(a)
      egal.args[1][1].must.equal(b)
    })

    it("must be called when recursing into objects", function() {
      var egal = Sinon.spy()
      var a = {}, b = {}
      deepEgal({key: a}, {key: b}, egal)

      egal.callCount.must.equal(2)
      egal.args[1].length.must.equal(2)
      egal.args[1][0].must.equal(a)
      egal.args[1][1].must.equal(b)
    })
  })
})
