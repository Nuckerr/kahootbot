module.exports = function(egal) {
  describe("given Date", function() {
    it("must return true given equivalent dates", function() {
      egal(new Date(2000, 5), new Date(2000, 5)).must.be.true()
    })

    it("must return false given unequivalent dates", function() {
      egal(new Date(2000, 5), new Date(1999, 5)).must.be.false()
    })

    it("must return false given Date and number primitive", function() {
      egal(new Date(1337), 1337).must.be.false()
    })
  })
}
