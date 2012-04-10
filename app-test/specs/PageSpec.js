(function() {
  var _this = this;

  describe("Basic assumptions", function() {
    return it("has Sencha Touch loaded", function() {
      expect(forminator.model.Page).toBeDefined();
      return Ext.create("forminator.model.Page");
    });
  });

}).call(this);
