(function() {

  Ext.define("app.model.form.Sketch", {
    extend: "app.model.form.Field",
    config: {
      componentClass: 'app.view.SketchField',
      fields: [
        {
          name: 'points',
          type: 'array'
        }
      ]
    },
    requires: ['app.view.SketchField'],
    createField: function() {
      return {
        xtype: 'sketchfield',
        minHeight: 600,
        useToolbar: false,
        label: this.createLabel(),
        name: this.get('name')
      };
    }
  });

}).call(this);
