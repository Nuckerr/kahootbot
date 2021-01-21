module.exports = function(egal) {
  describe("given Object with constructor", function() {
    it("must return false given equivalent objects", function() {
      function Value() {}
      egal(new Value, new Value).must.be.false()
    })

    it("must return false given different constructors", function() {
      function Value() {}
      function Price() {}
      egal(new Value, new Price).must.be.false()
    })

    it("must return false given subclassed constructor", function() {
      function Value(value) { this.value = value }

      function MoreValue(value) { this.value = value }
      MoreValue.prototype = Object.create(Value.prototype, {
        constructor: {value: MoreValue, configurable: true, writable: true}
      })

      var a = new Value(42)
      var b = new MoreValue(42)
      egal(a, b).must.be.false()
    })
  })
}
