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
    },
    initialize: function() {
      this.callParent();
      return this.getComponent().on({
        scope: this,
        change: 'onSketchChange'
      });
    },
    onSketchChange: function(sketchData) {
      return this.fireEvent("change", this, sketchData);
    },
    getValues: function() {
      return this.getComponent().pngData();
    },
    getValue: function() {
      return this.getValues();
    }
  });

}).call(this);
