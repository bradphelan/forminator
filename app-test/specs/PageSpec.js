(function() {
  var _this = this;

  describe("Basic assumptions", function() {
    return it("has Sencha Touch loaded", function() {
      expect(app.model.Page).toBeDefined();
      return Ext.create("app.model.Page");
    });
  });

}).call(this);
