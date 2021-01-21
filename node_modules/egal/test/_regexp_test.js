module.exports = function(egal) {
  describe("given RegExp", function() {
    it("must return true given equivalent primitives", function() {
      egal(/a/, /a/).must.be.true()
    })

    it("must return false given unequivalent primitives", function() {
      egal(/a/, /b/).must.be.false()
    })

    it("must return false if given unequivalent flags", function() {
      egal(/a/ig, /a/i).must.be.false()
    })

    it("must return false given RegExp and string primitive", function() {
      egal(/a/, "/a/").must.be.false()
    })
  })
}
