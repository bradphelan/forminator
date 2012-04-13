(function() {

  Ext.define('app.controller.Forms', {
    extend: 'Ext.app.Controller',
    currentRecord: null,
    config: {
      refs: {
        formlist: '#formlist',
        formsummary: '#formsummary',
        executeFormButton: '#executeFormButton'
      },
      currentRecord: null,
      control: {
        formlist: {
          itemtap: 'doSelectForm'
        },
        executeFormButton: {
          tap: 'doExecuteForm'
        }
      }
    },
    doSelectForm: function(list, index, item, record, e) {
      var formsummary;
      formsummary = this.getFormsummary();
      this.currentRecord = record;
      formsummary.setRecord(record);
      return formsummary.initialize();
    },
    doExecuteForm: function() {
      console.log("yay");
      return app.view.MainNavigation.push(this.currentRecord.createForm());
    }
  });

}).call(this);
