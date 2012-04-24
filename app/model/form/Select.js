(function() {

  Ext.define('app.model.form.Select', {
    extend: 'app.model.form.Option',
    createField: function() {
      return {
        xtype: 'selectfield',
        name: this.get('name'),
        label: this.createLabel(),
        options: this.options()
      };
    },
    initialize: function() {
      this.callParent(arguments);
      return setComponentClass('app.view.SelectField');
    }
  });

}).call(this);
