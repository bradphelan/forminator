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

  Ext.define('Ext.PanelExtensions', {
    override: 'Ext.Panel',
    autowire: function(events) {
      var event, h, m, _i, _len, _results,
        _this = this;
      _results = [];
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        event = events[_i];
        h = {};
        m = "do" + (Ext.String.capitalize(event));
        console.log(m);
        h[event] = (function(m) {
          return function() {
            return _this[m].apply(_this, arguments);
          };
        })(m);
        _results.push(this.addListener(h));
      }
      return _results;
    }
  });

  Ext.application({
    name: "app",
    requires: ["Ext.MessageBox", "app.view.MainNavigation", 'app.controller.Forms'],
    views: ["Main"],
    controllers: ['app.controller.Forms'],
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
