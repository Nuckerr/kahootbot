module.exports = function(egal) {
  it("must return true given nulls", function() {
    egal(null, null).must.be.true()
  })

  it("must return true given undefineds", function() {
    egal(undefined, undefined).must.be.true()
  })

  it("must return false given null and undefined", function() {
    egal(null, undefined).must.be.false()
  })
}
