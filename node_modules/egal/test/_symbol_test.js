var describe = typeof Symbol == "undefined" ? global.xdescribe : global.describe

module.exports = function(egal) {
  describe("given Symbol", function() {
    it("must return true given the same symbol", function() {
      var symbol = Symbol()
      egal(symbol, symbol).must.be.true()
    })

    it("must return false given two anonymous symbols", function() {
      egal(Symbol(), Symbol()).must.be.false()
    })

    it("must return false given two named symbols", function() {
      egal(Symbol("iterator"), Symbol("iterator")).must.be.false()
    })
  })
}
