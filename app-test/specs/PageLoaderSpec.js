(function() {
  var _this = this;

  describe("Basic assumptions", function() {
    return it("has Sencha Touch loaded", function() {
      expect(Ext).toBeDefined();
      expect(Ext.getVersion()).toBeTruthy();
      return expect(Ext.getVersion().major).toEqual(4);
    });
  });

}).call(this);
