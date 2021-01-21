module.exports = function(egal) {
  describe("given Function", function() {
    it("must return true given identical functions", function() {
      function fn() {}
      egal(fn, fn).must.be.true()
    })

    it("must return false given equivalent functions", function() {
      egal(function() {}, function() {}).must.be.false()
    })
  })
}
