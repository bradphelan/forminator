(function() {

  Ext.define('app.view.FormSummary', {
    extend: "Ext.Panel",
    xtype: 'formsummary',
    config: {
      layout: 'vbox',
      record: {}
    },
    st: function(txt) {
      return new Ext.Template(txt, {
        compiled: true
      });
    },
    initialize: function() {
      var record,
        _this = this;
      this.removeAll(true, true);
      if (this.getRecord() != null) {
        record = this.getRecord();
        return this.add([
          {
            record: record,
            tpl: this.st("{summary:htmlEncode}"),
            padding: 50
          }, {
            xtype: 'button',
            docked: 'bottom',
            bubbleEvents: 'executeForm',
            text: "Execute",
            listeners: {
              tap: function(b, e, o) {
                return b.fireEvent('executeForm', record);
              }
            }
          }
        ]);
      }
    }
  });

}).call(this);
