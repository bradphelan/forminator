(function() {

  Ext.define('app.view.ModalFormData', {
    extend: 'Ext.Panel',
    xtype: 'modalformdata',
    config: {
      record: null,
      modal: true,
      centered: true,
      width: "80%",
      height: "80%",
      layout: 'vbox'
    },
    initialize: function() {
      var _this = this;
      this.add([
        {
          xtype: 'panel',
          items: [
            {
              xtype: 'panel',
              data: {
                json: JSON.stringify(this.getRecord().getData(), void 0, 2)
              },
              tpl: new Ext.XTemplate("<pre><code>\n{json:htmlEncode}\n</code></pre>"),
              padding: 50,
              width: "100%",
              height: "100%"
            }
          ],
          scrollable: "auto",
          flex: 1
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
