module.exports = function(egal) {
  // Allow using String as constructor:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */

  describe("given String", function() {
    it("must return true given identical primitives", function() {
      egal("ok", "ok").must.be.true()
    })

    it("must return false given unequivalent primitives", function() {
      egal("ok", "no").must.be.false()
    })

    it("must return true given equivalent objects", function() {
      egal(new String("ok"), new String("ok")).must.be.true()
    })

    it("must return false given unequivalent objects", function() {
      egal(new String("ok"), new String("no")).must.be.false()
    })

    it("must return false given equivalent primitive and object", function() {
      egal("ok", new String("ok")).must.be.false()
    })

    it("must return false given number primitive", function() {
      egal("42", 42).must.be.false()
    })

    it("must return false given number object", function() {
      egal("42", new Number(42)).must.be.false()
    })
  })
}
