(function() {

  Ext.define('app.view.MainNavigation', {
    singleton: true,
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
      return this.autowire(['submitForm']);
    },
    doSubmitForm: function(record) {
      return app.view.MainNavigation.add({
        xtype: 'modalformdata',
        record: record
      });
    }
  });

}).call(this);
