(function() {

  Ext.define("app.view.FormKiosk", {
    extend: "Ext.Panel",
    xtype: "formkiosk",
    currentRecord: null,
    requires: ['app.model.FormDefinition', 'app.view.FormSummary', 'app.view.FormList'],
    initialize: function() {
      return this.autowire(['executeForm', 'selectForm']);
    },
    doExecuteForm: function(record) {
      console.log('a');
      return app.view.MainNavigation.push(record.createForm());
    },
    doSelectForm: function(record) {
      var formsummary;
      console.log('b');
      formsummary = this.query("formsummary")[0];
      this.currentRecord = record;
      formsummary.setRecord(record);
      return formsummary.initialize();
    },
    config: {
      layout: 'vbox',
      title: 'Forminator',
      items: [
        {
          xtype: 'titlebar',
          title: 'Select a form'
        }, {
          xtype: 'panel',
          layout: 'hbox',
          flex: 1,
          items: [
            {
              xtype: 'formlist'
            }, {
              xtype: 'formsummary',
              flex: 2
            }
          ]
        }
      ]
    }
  });

}).call(this);
