module.exports = function(egal) {
  // Allow using Boolean as constructor:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */

  describe("given Boolean", function() {
    it("must return true given identical primitives", function() {
      egal(true, true).must.be.true()
    })

    it("must return false given unequivalent primitives", function() {
      egal(true, false).must.be.false()
    })

    it("must return true given equivalent objects", function() {
      egal(new Boolean(true), new Boolean(true)).must.be.true()
    })

    it("must return false given unequivalent objects", function() {
      egal(new Boolean(true), new Boolean(false)).must.be.false()
    })

    it("must return false given equivalent primitive and object", function() {
      egal(true, new Boolean(true)).must.be.false()
      egal(false, new Boolean(false)).must.be.false()
    })
  })
}

