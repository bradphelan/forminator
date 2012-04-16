(function() {

  Ext.define('app.view.MainNavigation', {
    extend: 'Ext.navigation.View',
    requires: ['app.view.FormKiosk', 'app.view.ModalFormData'],
    config: {
      items: [
        {
          xtype: "formkiosk"
        }
      ]
    },
    initialize: function() {
      return this.autowire(['submitForm', 'executeForm']);
    },
    doExecuteForm: function(record) {
      return this.push(record.createForm());
    },
    doSubmitForm: function(record) {
      var panel;
      this.pop();
      panel = Ext.create('app.view.ModalFormData', {
        record: record
      });
      return Ext.Viewport.add(panel);
    }
  });

}).call(this);
