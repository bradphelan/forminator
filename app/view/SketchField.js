(function() {

  Ext.define("app.view.SketchField", {
    extend: "Ext.field.Field",
    xtype: "sketchfield",
    config: {
      component: {
        xtype: "sketch",
        minHeight: 600,
        useToolbar: false
      }
    }
  });

}).call(this);
