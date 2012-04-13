(function() {

  Ext.define('app.view.ModalFormData', {
    extend: 'Ext.Panel',
    xtype: 'modalformdata',
    config: {
      modal: true,
      centered: true
    },
    constructor: function(config) {
      this.record = config.record;
      return this.callParent(config);
    },
    initialize: function() {
      var _this = this;
      this.add([
        {
          data: {
            json: JSON.stringify(this.record.getData(), void 0, 2)
          },
          tpl: new Ext.XTemplate("<pre><code>\n{json:htmlEncode}\n</code></pre>"),
          padding: 50
        }, {
          xtype: 'button',
          text: 'dismiss',
          docked: 'bottom'
        }
      ]);
      return this.addListener({
        tap: {
          delegate: 'button',
          fn: function() {
            return _this.destroy();
          }
        }
      });
    }
  });

}).call(this);
