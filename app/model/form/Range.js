(function() {

  Ext.define("app.model.form.Range", {
    extend: 'app.model.form.Field',
    fields: [
      {
        name: 'range',
        type: 'object'
      }
    ],
    requires: ['app.view.RangeField'],
    config: {
      componentClass: 'app.view.RangeField'
    }
  });

}).call(this);
