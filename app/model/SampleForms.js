(function() {

  Ext.define('app.model.SampleForms', {
    extend: 'Ext.data.Store',
    requires: ['app.model.FormDefinition', 'Ext.data.Store'],
    config: {
      model: 'app.model.FormDefinition',
      proxy: {
        type: 'ajax',
        url: "/forms.json",
        reader: "json"
      },
      autoLoad: true
    }
  });

}).call(this);
