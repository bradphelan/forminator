(function() {

  Ext.define('app.model.form.Select', {
    extend: 'app.model.form.Option',
    createSelectField: function() {
      return {
        xtype: 'selectfield',
        name: this.get('name'),
        label: 'choose',
        options: this.options()
      };
    }
  });

}).call(this);
