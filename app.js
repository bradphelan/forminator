(function() {

  Ext.Loader.setPath({
    Ext: "sdk/src"
  });

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

  Ext.application({
    name: "app",
    requires: ["Ext.MessageBox", "app.view.MainNavigation"],
    views: ["Main"],
    icon: {
      57: "resources/icons/Icon.png",
      72: "resources/icons/Icon~ipad.png",
      114: "resources/icons/Icon@2x.png",
      144: "resources/icons/Icon~ipad@2x.png"
    },
    phoneStartupScreen: "resources/loading/Homescreen.jpg",
    tabletStartupScreen: "resources/loading/Homescreen~ipad.jpg",
    launch: function() {
      Ext.fly("appLoadingIndicator").destroy();
      return Ext.Viewport.add(app.view.MainNavigation);
    },
    onUpdated: function() {
      return Ext.Msg.confirm("Application Update", "This application has just successfully been updated to the latest version. Reload now?", function() {
        return window.location.reload();
      });
    }
  });

}).call(this);
