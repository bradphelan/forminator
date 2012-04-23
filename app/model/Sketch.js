(function() {

  Ext.define("app.model.form.Sketch", {
    extend: "app.model.form.Field",
    config: {
      fields: [
        {
          name: 'points',
          type: 'array'
        }
      ]
    },
    requires: ['app.view.Sketch'],
    createField: function() {
      return {
        xtype: 'sketch'
      };
    }
  });

}).call(this);
