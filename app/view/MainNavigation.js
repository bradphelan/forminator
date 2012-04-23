(function() {

  Ext.define('app.view.MainNavigation', {
    extend: 'Ext.navigation.View',
    requires: ['app.view.FormKiosk', 'app.view.ModalFormData', 'app.view.Sketch'],
    initialize: function() {
      this.callParent(arguments);
      this.getNavigationBar().hide();
      this.autowire(['submitForm', 'executeForm']);
      return this.push({
        xtype: "formkiosk"
      });
    },
    doExecuteForm: function(record) {
      return this.push(record.createForm());
    },
    doSubmitForm: function(record) {
      var panel,
        _this = this;
      this.pop();
      panel = Ext.create('app.view.ModalFormData', {
        record: record
      });
      Ext.Viewport.add(panel);
      return Ext.Ajax.request({
        params: JSON.stringify(record.getData(), void 0, 2),
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        url: "/form.json",
        success: function(response) {
          return console.log("YAY");
        },
        error: function() {
          return console.log("Nein");
        }
      });
    }
  });

}).call(this);
