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
      this.pop();
      return this.add({
        xtype: 'modalformdata',
        record: record
      });
    }
  });

}).call(this);
