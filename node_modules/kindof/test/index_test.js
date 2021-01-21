// Using assert instead of Must.js for safety because Must.js uses kindof.
var assert = require("assert")
var kindof = require("..")

describe("kindof", function() {
  // Allow using Boolean, Number, String as constructors in tests.
  /* jshint -W053 */

  it("must return \"undefined\" for undefined", function() {
    assert.strictEqual(kindof(undefined), "undefined")
  })

  it("must return \"null\" for null", function() {
    assert.strictEqual(kindof(null), "null")
  })

  describe("given Boolean", function() {
    it("must return \"boolean\" for true", function() {
      assert.strictEqual(kindof(true), "boolean")
    })

    it("must return \"boolean\" for false", function() {
      assert.strictEqual(kindof(false), "boolean")
    })

    it("must return \"object\" for new Boolean(true)", function() {
      assert.strictEqual(kindof(new Boolean(true)), "object")
    })

    it("must return \"object\" for new Boolean(false)", function() {
      assert.strictEqual(kindof(new Boolean(false)), "object")
    })

    describe("given another context", function() {
      context("must return \"object\" for boolean object", function(window) {
        assert.strictEqual(kindof(new window.Boolean), "object")
      })
    })
  })

  describe("given Number", function() {
    it("must return \"number\" for number primitive", function() {
      assert.strictEqual(kindof(42), "number")
    })

    it("must return \"number\" for zero number primitive", function() {
      assert.strictEqual(kindof(0), "number")
    })

    it("must return \"object\" for number object", function() {
      assert.strictEqual(kindof(new Number(42)), "object")
    })

    it("must return \"object\" for zero number object", function() {
      assert.strictEqual(kindof(new Number(0)), "object")
    })

    it("must return \"number\" for NaN", function() {
      assert.strictEqual(kindof(NaN), "number")
    })

    it("must return \"number\" for Infinity", function() {
      assert.strictEqual(kindof(Infinity), "number")
    })

    describe("given another context", function() {
      context("must return \"object\" for number object", function(window) {
        assert.strictEqual(kindof(new window.Number), "object")
      })
    })
  })

  describe("given String", function() {
    it("must return \"string\" for string primitive", function() {
      assert.strictEqual(kindof("Hello"), "string")
    })

    it("must return \"string\" for empty string primitive", function() {
      assert.strictEqual(kindof(""), "string")
    })

    it("must return \"object\" for string object", function() {
      assert.strictEqual(kindof(new String("Hello")), "object")
    })

    it("must return \"object\" for empty string object", function() {
      assert.strictEqual(kindof(new String), "object")
    })

    describe("given another context", function() {
      context("must return \"object\" for string object", function(window) {
        assert.strictEqual(kindof(new window.String), "object")
      })
    })
  })

  if (typeof Symbol == "function") describe("given Symbol", function() {
    it("must return \"symbol\" for an anonymous symbol", function() {
      assert.strictEqual(kindof(Symbol()), "symbol")
    })

    it("must return \"symbol\" for a named symbol", function() {
      assert.strictEqual(kindof(Symbol("forEach")), "symbol")
    })

    it("must return \"symbol\" for an existing symbol", function() {
      assert.strictEqual(kindof(Symbol.iterator), "symbol")
    })
  })

  describe("given RegExp", function() {
    it("must return \"regexp\"", function() {
      assert.strictEqual(kindof(/./), "regexp")
    })

    describe("given another context", function() {
      context("must return \"regexp\"", function(window) {
        assert.strictEqual(kindof(new window.RegExp), "regexp")
      })
    })
  })

  describe("given Date", function() {
    it("must return \"date\"", function() {
      assert.strictEqual(kindof(new Date), "date")
    })

    describe("given another context", function() {
      context("must return \"date\"", function(window) {
        assert.strictEqual(kindof(new window.Date), "date")
      })
    })
  })

  describe("given Array", function() {
    it("must return \"array\"", function() {
      assert.strictEqual(kindof([]), "array")
    })

    describe("given another context", function() {
      context("must return \"array\"", function(window) {
        assert.strictEqual(kindof(new window.Array), "array")
      })
    })
  })

  describe("given Function", function() {
    it("must return \"function\"", function() {
      assert.strictEqual(kindof(function() {}), "function")
    })

    describe("given another context", function() {
      context("must return \"function\"", function(window) {
        assert.strictEqual(kindof(new window.Function), "function")
      })
    })
  })

  describe("given Error", function() {
    it("must return \"object\"", function() {
      assert.strictEqual(kindof(new Error), "object")
    })
  })

  describe("given Arguments", function() {
    it("must return \"object\"", function() {
      assert.strictEqual(kindof(arguments), "object")
    })
  })

  describe("given Math", function() {
    it("must return \"object\"", function() {
      assert.strictEqual(kindof(Math), "object")
    })
  })

  describe("given JSON", function() {
    it("must return \"object\"", function() {
      assert.strictEqual(kindof(JSON), "object")
    })
  })

  describe("given Object", function() {
    it("must return \"object\"", function() {
      assert.strictEqual(kindof({}), "object")
    })
  })

  describe("given custom instance", function() {
    it("must return \"object\"", function() {
      function Foo() {}
      assert.strictEqual(kindof(new Foo), "object")
    })
  })

  function context(title, fn) {
    if (typeof window == "undefined") return it.skip(title)

    it(title, function() {
      var frame = document.createElement("iframe")
      document.body.appendChild(frame)
      try { fn(frame.contentWindow) }
      finally { document.body.removeChild(frame) }
    })
  }
})
