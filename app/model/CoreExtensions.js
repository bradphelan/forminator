(function() {

  Ext.define('app.model.CoreExtensions', {
    singleton: true,
    constructor: function() {
      this.callParent(arguments);
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
      return Ext.define('Ext.PanelExtensions', {
        override: 'Ext.Container',
        autowire: function(events) {
          var event, h, m, _i, _len, _results,
            _this = this;
          _results = [];
          for (_i = 0, _len = events.length; _i < _len; _i++) {
            event = events[_i];
            h = {};
            m = "do" + (Ext.String.capitalize(event));
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
    }
  });

  app.model.CoreExtensions;

}).call(this);
