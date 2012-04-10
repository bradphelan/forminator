(function() {
  var Application;

  Ext.require("Ext.app.Application");

  Ext.define('Ext.util.CollectionExtensions', {
    override: 'Ext.util.Collection',
    collect: function(fn, scope) {
      var array, cb,
        _this = this;
      array = [];
      cb = function(elem, idx, len) {
        return array.push(fn(elem, idx, len));
      };
      this.each(cb, scope);
      return array;
    }
  });

  Application = null;

  Ext.onReady(function() {
    return Application = Ext.create("Ext.app.Application", {
      name: "app",
      controllers: [],
      models: ["Page"],
      launch: function() {
        jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
        return jasmine.getEnv().execute();
      }
    });
  });

}).call(this);
