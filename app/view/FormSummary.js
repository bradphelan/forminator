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
      var record;
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
            id: "executeFormButton",
            docked: 'bottom',
            text: "Execute"
          }
        ]);
      }
    }
  });

}).call(this);
